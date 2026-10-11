import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { repositoryKey, discover, required, clean, run } from "../workspace-lib.mjs";
import { deploymentSettings, planDeployment, uploadPlan } from "../deploy.mjs";

function workspace(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "portfolios-orchestration-"));
  t.after(() => {
    const target = path.relative(os.tmpdir(), path.resolve(root));
    assert(!target.startsWith("..") && !path.isAbsolute(target) && target.startsWith("portfolios-orchestration-"));
    fs.rmSync(root, { recursive: true, force: true });
  });
  return root;
}
function write(root, name, body = "fixture") {
  const destination = path.join(root, name);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, body);
}
function repository(root, name, origin) {
  const directory = path.join(root, name);
  fs.mkdirSync(directory);
  execFileSync("git", ["init", "-q", directory]);
  execFileSync("git", ["-C", directory, "remote", "add", "origin", origin]);
  return directory;
}
function manifest(root) {
  write(root, "deploy.config.json", JSON.stringify({ schemaVersion: 1, paths: ["index.html", "sw.js", "apps", "large.wasm"], skipLargeDefault: ["large.wasm"], optionalPaths: ["docs/wasm"] }));
  for (const file of ["index.html", "sw.js", "apps/browser/index.html", "apps/browser/assets/main.js", "apps/game/gamedata/save.dat", "large.wasm"]) write(root, file);
}

test("Git identity accepts HTTPS and SSH; renamed repos are discovered and duplicates rejected", t => {
  const root = workspace(t);
  const config = { repositories: { os: { repository: "https://github.com/Bl4ut0/PortfoliOS" }, runtime: { repository: "https://github.com/Bl4ut0/PortfoliOS-Runtime" } } };
  const renamed = repository(root, "renamed site", "git@github.com:Bl4ut0/PortfoliOS.git");
  repository(root, "unrelated", "https://github.com/another/PortfoliOS.git");
  fs.mkdirSync(path.join(renamed, "nested"));
  assert.equal(repositoryKey("ssh://git@github.com/Bl4ut0/PortfoliOS.git"), repositoryKey(config.repositories.os.repository));
  assert.equal(repositoryKey("https://example.com/Bl4ut0/PortfoliOS"), null);
  assert.deepEqual(discover(root, config), { os: renamed, runtime: null });
  assert.throws(() => required(discover(root, config), "runtime"), /Missing runtime/);
  repository(root, "duplicate", config.repositories.os.repository);
  assert.throws(() => discover(root, config), /Ambiguous os/);
});

test("quick and full deployment include the intended engines and publish all assets before HTML", t => {
  const root = workspace(t); manifest(root);
  write(root, "apps/browser/.env", "PRIVATE");
  write(root, "apps/browser/node_modules/module.js");
  const quick = planDeployment(root);
  const names = quick.files.map(file => file.relative);
  assert(!names.includes("large.wasm"));
  assert(!names.some(file => file.includes("gamedata") || file.includes(".env") || file.includes("node_modules")));
  assert.equal(names.at(-1), "index.html");
  assert(names.indexOf("apps/browser/assets/main.js") < names.indexOf("apps/browser/index.html"));
  assert(names.indexOf("apps/browser/index.html") < names.indexOf("sw.js"));
  assert.equal(quick.bytes, quick.files.reduce((sum, file) => sum + fs.statSync(file.absolute).size, 0));
  const full = planDeployment(root, ["--full"]).files.map(file => file.relative);
  assert(full.includes("large.wasm"));
  assert(full.includes("apps/game/gamedata/save.dat"));
});

test("full deployment preserves legal game bundle names containing brackets, spaces and tildes", t => {
  const root = workspace(t); manifest(root);
  for (const file of ["apps/game/gamedata/DM-Deck16][.unr", "apps/game/runtime~main.js", "apps/game/a file.dat"]) write(root, file);
  const files = planDeployment(root, ["--full"]).files.map(file => file.relative);
  for (const file of ["apps/game/gamedata/DM-Deck16][.unr", "apps/game/runtime~main.js", "apps/game/a file.dat"]) assert(files.includes(file));
});

test("targeted deploy rejects escapes, secrets, nonexistent files and symbolic links", t => {
  const root = workspace(t); manifest(root);
  for (const item of ["../.env", "apps/../.env", ".env", "scripts/private.js", "apps/browser/.env", "apps/missing.js", "apps/", "apps\\secret.js"]) {
    assert.throws(() => planDeployment(root, ["--only=" + item]));
  }
  write(root, "docs/wasm/catalog.json", "{}");
  const selected = planDeployment(root, ["--only=docs/wasm/catalog.json,index.html"]);
  assert.deepEqual(selected.files.map(file => file.relative), ["docs/wasm/catalog.json", "index.html"]);
  const outside = path.join(root, "outside"); fs.mkdirSync(outside);
  fs.symlinkSync(outside, path.join(root, "apps/link"), process.platform === "win32" ? "junction" : "dir");
  assert.throws(() => planDeployment(root), /symbolic links/);
});

test("credentials use one fallback file and process environment overrides without being logged", t => {
  const root = workspace(t); const site = path.join(root, "site"); fs.mkdirSync(site);
  write(site, ".env", "FTP_HOST=old\nFTP_USER=user\nFTP_PASS='fallback'\nFTP_SECURE=false\n");
  assert.equal(deploymentSettings(root, site, {}).password, "fallback");
  write(root, ".env", "FTP_HOST=new\n");
  assert.throws(() => deploymentSettings(root, site, {}), /Missing FTP/);
  const env = { FTP_HOST: "ci-host", FTP_USER: "ci-user", FTP_PASS: "ci-pass", FTP_REMOTE_DIR: "/site", FTP_SECURE: "true" };
  assert.deepEqual(deploymentSettings(root, site, env), { host: "ci-host", user: "ci-user", password: "ci-pass", remoteDir: "/site", secure: true, port: 21 });
  assert.throws(() => deploymentSettings(root, site, { ...env, FTP_PORT: "bad" }), /FTP_PORT/);
  assert.throws(() => deploymentSettings(root, site, { ...env, FTP_REMOTE_DIR: "/../site" }), /FTP_REMOTE_DIR/);
});

test("transport uploads the exact ordered plan and stops immediately on failure", async t => {
  const root = workspace(t); manifest(root);
  const plan = planDeployment(root, ["--only=apps/browser,index.html"]);
  const uploaded = []; const directories = [];
  const client = { async access() {}, async ensureDir(directory) { directories.push(directory); }, async uploadFrom(file, name) { uploaded.push([file, name]); } };
  await uploadPlan(client, { remoteDir: "/site" }, plan);
  assert.deepEqual(uploaded.map(item => item[0]), plan.files.map(file => file.absolute));
  assert(directories.every(directory => directory.startsWith("/site")));
  let attempts = 0;
  client.uploadFrom = async () => { attempts++; throw new Error("transport failed"); };
  await assert.rejects(uploadPlan(client, { remoteDir: "/site" }, plan), /transport failed/);
  assert.equal(attempts, 1);
});

test("build refuses modified source and child command failures propagate", t => {
  const root = workspace(t);
  const repo = repository(root, "browser", "https://github.com/Bl4ut0/PortfoliOS-Browser.JS");
  write(repo, "modified.txt");
  assert.throws(() => clean(repo), /clean, committed/);
  assert.throws(() => run(repo, ["-e", "process.exit(7)"]), /failed \(7\)/);
});

function cliFixture(t) {
  const root = workspace(t);
  const source = fileURLToPath(new URL("..", import.meta.url));
  for (const file of ["workspace.mjs", "workspace-lib.mjs", "deploy.mjs"]) write(root, "scripts/" + file, fs.readFileSync(path.join(source, file)));
  write(root, "package.json", '{"type":"module"}');
  const config = { repositories: { os: { repository: "https://github.com/Bl4ut0/PortfoliOS", checks: [["scripts/check.cjs"]] }, browser: { repository: "https://github.com/Bl4ut0/PortfoliOS-Browser.JS", checks: [["--check", "scripts/build.mjs"]], build: ["scripts/build.mjs"] }, runtime: { repository: "https://github.com/Bl4ut0/PortfoliOS-Runtime", checks: [["--test"]] } } };
  write(root, "workspace.json", JSON.stringify(config));
  const site = repository(root, "renamed OS", "https://github.com/Bl4ut0/PortfoliOS.git");
  const browser = repository(root, "renamed browser", "ssh://git@github.com/Bl4ut0/PortfoliOS-Browser.JS.git");
  manifest(site);
  write(site, "scripts/check.cjs", 'require("node:fs").writeFileSync("checked.txt", "checked")');
  const invoke = (...args) => spawnSync(process.execPath, [path.join(root, "scripts/workspace.mjs"), ...args], { cwd: os.tmpdir(), encoding: "utf8", windowsHide: true, env: { ...process.env, FTP_HOST: "", FTP_USER: "", FTP_PASS: "" } });
  return { root, site, browser, invoke };
}

test("CLI preview needs neither credentials nor FTP dependencies; invalid options and missing Runtime fail", t => {
  const { root, site, invoke } = cliFixture(t);
  write(root, ".env", "FTP_PORT=invalid\n");
  const preview = invoke("deploy", "--dry-run", "--only=apps/browser,index.html");
  assert.equal(preview.status, 0, preview.stderr);
  assert.match(preview.stdout, /No credentials loaded; no connection made/);
  assert(!fs.existsSync(path.join(site, "checked.txt")));
  assert.equal(invoke("deploy", "--unknown").status, 1);
  assert.equal(invoke("deploy", "--only=../private").status, 1);
  const missing = invoke("check", "--with-runtime");
  assert.equal(missing.status, 1);
  assert.match(missing.stderr, /Missing runtime/);
  assert(!fs.existsSync(path.join(site, "checked.txt")));
});

test("CLI dispatches build and import using detected renamed checkouts and propagates check failures", t => {
  const { site, browser, invoke } = cliFixture(t);
  write(browser, ".gitignore", "built.txt\n");
  write(browser, "scripts/build.mjs", 'import fs from "node:fs"; fs.writeFileSync("built.txt", "built");');
  execFileSync("git", ["-C", browser, "add", "."]);
  execFileSync("git", ["-C", browser, "-c", "user.name=Test", "-c", "user.email=test@example.invalid", "-c", "commit.gpgsign=false", "commit", "-qm", "fixture"]);
  const built = invoke("build");
  assert.equal(built.status, 0, built.stderr);
  assert(fs.existsSync(path.join(browser, "built.txt")));
  write(site, "scripts/import-browserjs.mjs", 'import fs from "node:fs"; import path from "node:path"; if (!fs.existsSync(path.join(process.argv[2], "built.txt"))) process.exit(8); fs.writeFileSync("imported.txt", process.argv[2]);');
  const imported = invoke("import");
  assert.equal(imported.status, 0, imported.stderr);
  assert.equal(fs.readFileSync(path.join(site, "imported.txt"), "utf8"), browser);
  write(site, "scripts/check.cjs", "process.exit(9)");
  const failed = invoke("deploy", "--only=index.html");
  assert.equal(failed.status, 1);
  assert.match(failed.stderr, /Command failed \(9\)/);
  assert(!failed.stdout.includes("deployment:"));
});


test("PdfCraft deployment requires receipt-matching artifacts", t => {
  const root = workspace(t); manifest(root);
  write(root, "apps/pdfcraft/release.json", JSON.stringify({version:"0.6.0",files:{"engine.wasm":{bytes:3,sha256:"ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"}}}));
  assert.throws(()=>planDeployment(root),/Missing PdfCraft artifact/);
  write(root,"apps/pdfcraft/runtime/v0.6.0/engine.wasm","abc");
  assert(planDeployment(root).files.some(file=>file.relative.endsWith("engine.wasm")));
  write(root,"apps/pdfcraft/runtime/v0.6.0/engine.wasm","bad");
  assert.throws(()=>planDeployment(root),/checksum mismatch/);
});

for(const app of ['photocraft','vectorcraft','designcraft','lightcraft','filmcraft','effectcraft','vscode'])test(app+' deployment requires pinned artifacts',t=>{
 const root=workspace(t);manifest(root);write(root,'apps/'+app+'/release.json',JSON.stringify({version:'1.0.0',files:{'engine.js':{bytes:3,sha256:'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'}}}));
 assert.throws(()=>planDeployment(root),/Missing .* artifact/);const artifact='apps/'+app+'/runtime/'+(app==='vscode'?'dist':'v1.0.0')+'/engine.js';write(root,artifact,'abc');assert(planDeployment(root).files.some(f=>f.relative===artifact));write(root,artifact,'bad');assert.throws(()=>planDeployment(root),/checksum mismatch/);
});

test('LightCraft hidden Rust locks remain hash-verified and never upload',t=>{
 const root=workspace(t);manifest(root);const locks=['.cargo-lock','.cargo-artifact-lock','.cargo-build-lock'];const files=Object.fromEntries(locks.map(name=>[name,{bytes:0,sha256:'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}]));write(root,'apps/lightcraft/release.json',JSON.stringify({version:'0.6.0',files}));for(const name of locks)write(root,'apps/lightcraft/runtime/v0.6.0/'+name,'');assert(!planDeployment(root).files.some(f=>locks.some(name=>f.relative.endsWith('/'+name))));write(root,'apps/lightcraft/runtime/v0.6.0/.cargo-lock','tampered');assert.throws(()=>planDeployment(root),/checksum mismatch/);
});
