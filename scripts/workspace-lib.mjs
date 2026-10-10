import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

export function repositoryKey(remote) {
  try {
    const url = new URL(remote.trim().replace(/^git@github\.com:/i, "https://github.com/"));
    if (url.hostname.toLowerCase() !== "github.com" || !["https:", "ssh:"].includes(url.protocol)) return null;
    return (url.hostname + url.pathname.replace(/\/+$/, "").replace(/\.git$/i, "")).toLowerCase();
  } catch { return null; }
}

export function git(directory, args) {
  const result = spawnSync("git", ["-C", directory, ...args], { encoding: "utf8", windowsHide: true });
  if (result.error) throw result.error;
  return result;
}

export function discover(root, config) {
  const candidates = fs.readdirSync(root, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && !entry.name.startsWith("."))
    .map(entry => path.join(root, entry.name));
  const found = Object.fromEntries(Object.keys(config.repositories).map(id => [id, []]));
  for (const directory of candidates) {
    const top = git(directory, ["rev-parse", "--show-toplevel"]);
    if (top.status !== 0 || fs.realpathSync(top.stdout.trim()) !== fs.realpathSync(directory)) continue;
    const origin = git(directory, ["remote", "get-url", "origin"]);
    if (origin.status !== 0) continue;
    for (const [id, info] of Object.entries(config.repositories)) {
      if (repositoryKey(origin.stdout) === repositoryKey(info.repository)) found[id].push(fs.realpathSync(directory));
    }
  }
  return Object.fromEntries(Object.entries(found).map(([id, matches]) => {
    if (matches.length > 1) throw new Error(`Ambiguous ${id} checkout: found ${matches.length} matching Git origins.`);
    return [id, matches[0] || null];
  }));
}

export function required(repos, id) {
  if (!repos[id]) throw new Error(`Missing ${id} checkout. Clone the repository listed in workspace.json into this workspace.`);
  return repos[id];
}

export function clean(directory) {
  const result = git(directory, ["status", "--porcelain", "--untracked-files=normal"]);
  if (result.status !== 0 || result.stdout.trim()) throw new Error("Build Browser.JS from a clean, committed checkout before importing a release.");
}

export function run(directory, args) {
  const result = spawnSync(process.execPath, args, { cwd: directory, stdio: "inherit", windowsHide: true });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Command failed (${result.status ?? result.signal}): node ${args.join(" ")}`);
}
