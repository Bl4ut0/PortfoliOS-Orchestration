import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { clean, discover, git, required, run } from "./workspace-lib.mjs";
import { deploy, planDeployment } from "./deploy.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(fs.readFileSync(path.join(root, "workspace.json"), "utf8"));
const usage = "Usage: node scripts/workspace.mjs status | check [--with-runtime] | build [--install] | import | push [--dry-run] [--full] | deploy [--dry-run] [--full] [--changed] [--only=path,path]";

export async function main(args = process.argv.slice(2)) {
  const [command, ...flags] = args;
  if (!command || command === "--help") { console.log(usage); return; }
  const allowed = { status: [], check: ["--with-runtime"], build: ["--install"], import: [], push: ["--dry-run", "--full"], deploy: ["--dry-run", "--full", "--changed"] };
  if (!Object.hasOwn(allowed, command) || flags.some(flag => !allowed[command].includes(flag) && !(command === "deploy" && flag.startsWith("--only="))) || new Set(flags).size !== flags.length || flags.filter(flag => flag.startsWith("--only=")).length > 1) throw new Error(usage);
  const repos = discover(root, config);
  if (command === "status") {
    for (const [id, info] of Object.entries(config.repositories)) {
      if (!repos[id]) { console.log(`${id}: absent (${info.repository})`); continue; }
      const revision = git(repos[id], ["rev-parse", "HEAD"]).stdout.trim();
      const dirty = git(repos[id], ["status", "--porcelain"]).stdout.trim() ? "modified" : "clean";
      console.log(`${id}: ${path.relative(root, repos[id])} | ${revision} | ${dirty}${info.status ? " | " + info.status : ""}`);
    }
    return;
  }
  const check = id => {
    const directory = required(repos, id);
    for (const args of config.repositories[id].checks) run(directory, args);
  };
  if (command === "check") {
    if (flags.includes("--with-runtime")) required(repos, "runtime");
    check("os");
    if (repos.browser) check("browser");
    if (repos.m3prism) check("m3prism");
    if (flags.includes("--with-runtime")) check("runtime");
  } else if (command === "build") {
    const browser = required(repos, "browser");
    clean(browser);
    run(browser, [...config.repositories.browser.build, ...flags]);
    if (repos.m3prism) {
      clean(repos.m3prism);
      run(repos.m3prism, [...config.repositories.m3prism.build]);
    }
  } else if (command === "import") {
    run(required(repos, "os"), ["scripts/import-browserjs.mjs", required(repos, "browser")]);
    if (repos.m3prism && fs.existsSync(path.join(repos.m3prism, "app/client/dist/release.json"))) {
      run(required(repos, "os"), ["scripts/import-m3prism.mjs", repos.m3prism]);
    }
  } else if (command === "deploy" || command === "push") {
    const os = required(repos, "os");
    const deployFlags = command === "push" && !flags.includes("--changed") ? ["--changed", ...flags] : flags;
    const plan = planDeployment(os, deployFlags);
    if (!deployFlags.includes("--dry-run")) check("os");
    await deploy(root, os, plan, deployFlags.includes("--dry-run"));
  }
}

if (process.argv[1] && fs.realpathSync(path.resolve(process.argv[1])).toLowerCase() === fs.realpathSync(fileURLToPath(import.meta.url)).toLowerCase()) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
