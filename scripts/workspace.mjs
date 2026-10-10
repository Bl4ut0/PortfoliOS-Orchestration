import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { clean, discover, git, required, run } from "./workspace-lib.mjs";
import { deploy, planDeployment } from "./deploy.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(fs.readFileSync(path.join(root, "workspace.json"), "utf8"));
const usage = "Usage: node scripts/workspace.mjs status | check [--with-runtime] | build [--install] | import | deploy [--dry-run] [--full] [--only=path,path]";

export async function main(args = process.argv.slice(2)) {
  const [command, ...flags] = args;
  if (!command || command === "--help") { console.log(usage); return; }
  const allowed = { status: [], check: ["--with-runtime"], build: ["--install"], import: [], deploy: ["--dry-run", "--full"] };
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
    if (flags.includes("--with-runtime")) check("runtime");
  } else if (command === "build") {
    const browser = required(repos, "browser");
    clean(browser);
    run(browser, [...config.repositories.browser.build, ...flags]);
  } else if (command === "import") {
    run(required(repos, "os"), ["scripts/import-browserjs.mjs", required(repos, "browser")]);
  } else if (command === "deploy") {
    const os = required(repos, "os");
    const plan = planDeployment(os, flags);
    if (!flags.includes("--dry-run")) check("os");
    await deploy(root, os, plan, flags.includes("--dry-run"));
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
