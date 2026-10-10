import fs from "node:fs";
import path from "node:path";

function safePath(value) {
  if (typeof value !== "string" || !value || value.includes("\\") || path.posix.isAbsolute(value) || !/^[\w./-]+$/.test(value) || value.split("/").some(part => !part || [".", ".."].includes(part))) throw new Error("Unsafe deployment path: " + value);
  if (value.split("/").some(part => part.startsWith(".") && part !== ".htaccess" || part === "node_modules" || /\.(?:log|pem|key)$/i.test(part))) throw new Error("Private/development path cannot be deployed: " + value);
  return value;
}

export function planDeployment(osRoot, flags = []) {
  const manifest = JSON.parse(fs.readFileSync(path.join(osRoot, "deploy.config.json"), "utf8"));
  if (manifest.schemaVersion !== 1) throw new Error("Unsupported deployment manifest.");
  const roots = manifest.paths.map(safePath);
  const allowed = [...roots, ...(manifest.optionalPaths || []).map(safePath)];
  const full = flags.includes("--full");
  const onlyFlag = flags.find(flag => flag.startsWith("--only="));
  const only = onlyFlag ? onlyFlag.slice(7).split(",").map(safePath) : null;
  if (only && only.some(item => !allowed.some(root => item === root || item.startsWith(root + "/")))) throw new Error("Requested path is outside the OS deployment manifest.");
  const selected = only || roots.filter(item => full || !manifest.skipLargeDefault.includes(item));
  const files = new Map();
  const skipped = [];
  const visit = relative => {
    safePath(relative);
    const absolute = path.join(osRoot, relative);
    const stat = fs.lstatSync(absolute);
    if (stat.isSymbolicLink()) throw new Error("Deployment refuses symbolic links: " + relative);
    const resolved = path.relative(fs.realpathSync(osRoot), fs.realpathSync(absolute));
    if (resolved.startsWith("..") || path.isAbsolute(resolved)) throw new Error("Deployment path escapes the OS checkout.");
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(absolute).sort()) {
        const child = relative + "/" + entry;
        // Private files inside otherwise deployable app directories never upload.
        try { safePath(child); } catch { skipped.push(child); continue; }
        if (!full && /(?:^|\/)gamedata(?:\/|$)/i.test(child)) continue;
        visit(child);
      }
    } else if (stat.isFile()) files.set(relative, { relative, absolute, bytes: stat.size });
    else throw new Error("Unsupported deployment entry: " + relative);
  };
  for (const relative of selected) {
    if (!fs.existsSync(path.join(osRoot, relative))) {
      if (only) throw new Error("Requested deployment path does not exist: " + relative);
      skipped.push(relative);
      continue;
    }
    visit(relative);
  }
  const priority = file => file === "index.html" ? 3 : file === "sw.js" ? 2 : file.endsWith(".html") ? 1 : 0;
  const ordered = [...files.values()].sort((a, b) => priority(a.relative) - priority(b.relative) || a.relative.localeCompare(b.relative));
  if (!ordered.length) throw new Error("Deployment selected no files.");
  return { files: ordered, bytes: ordered.reduce((sum, file) => sum + file.bytes, 0), skipped, full, only: Boolean(only) };
}

export function readEnv(file) {
  if (!fs.existsSync(file)) return {};
  const result = {};
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.trim().match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;
    result[match[1]] = match[2].replace(/^(["'])(.*)\1$/, "$2");
  }
  return result;
}

export function deploymentSettings(root, osRoot, environment = process.env) {
  // One file source only: incomplete root settings must not borrow another account's secrets.
  const rootEnv = path.join(root, ".env");
  const values = { ...readEnv(fs.existsSync(rootEnv) ? rootEnv : path.join(osRoot, ".env")), ...environment };
  const port = Number(values.FTP_PORT || 21);
  if (!values.FTP_HOST || !values.FTP_USER || !values.FTP_PASS) throw new Error("Missing FTP_HOST, FTP_USER or FTP_PASS. Configure the orchestration .env or deployment environment.");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid FTP_PORT.");
  if (values.FTP_SECURE && !["true", "false"].includes(values.FTP_SECURE.toLowerCase())) throw new Error("FTP_SECURE must be true or false.");
  const remoteDir = values.FTP_REMOTE_DIR || "/domains/os.bl4ut0.dev/public_html";
  if (!remoteDir.startsWith("/") || remoteDir.includes("\\") || remoteDir.split("/").includes("..")) throw new Error("FTP_REMOTE_DIR must be an absolute server directory without traversal.");
  return { host: values.FTP_HOST, user: values.FTP_USER, password: values.FTP_PASS, port, secure: values.FTP_SECURE?.toLowerCase() === "true", remoteDir };
}

export async function uploadPlan(client, settings, plan) {
  await client.access({ host: settings.host, user: settings.user, password: settings.password, port: settings.port, secure: settings.secure });
  for (const file of plan.files) {
    const remote = path.posix.join(settings.remoteDir, file.relative);
    await client.ensureDir(path.posix.dirname(remote));
    await client.uploadFrom(file.absolute, path.posix.basename(remote));
  }
}

export async function deploy(root, osRoot, plan, dryRun = false) {
  console.log(`PortfoliOS ${dryRun ? "deployment preview" : "deployment"}: ${plan.files.length} files, ${(plan.bytes / 1024 / 1024).toFixed(2)} MiB (${plan.full ? "full" : "quick"}${plan.only ? ", selected paths" : ""}).`);
  if (plan.skipped.length) console.log(`Skipped ${plan.skipped.length} absent optional assets or private/development entries.`);
  if (dryRun) {
    for (const file of plan.files) console.log(file.relative);
    console.log("Dry run complete. No credentials loaded; no connection made.");
    return;
  }
  const settings = deploymentSettings(root, osRoot);
  const { Client } = await import("basic-ftp");
  const client = new Client();
  try {
    await uploadPlan(client, settings, plan);
    console.log(`Deployment complete: ${plan.files.length} files uploaded. Verify the release at the configured site.`);
  } finally { client.close(); }
}
