# Workspace build and deployment

[PortfoliOS-Orchestration](https://github.com/Bl4ut0/PortfoliOS-Orchestration) owns workspace command sequencing and FTP upload transport. Each project owns its executable build/check contracts. [PortfoliOS](https://github.com/Bl4ut0/PortfoliOS) owns the production site, its release/cache version, deployment asset manifest and Browser.JS importer. [Browser.JS](https://github.com/Bl4ut0/PortfoliOS-Browser.JS) owns its engine build and artifact receipt. [Runtime](https://github.com/Bl4ut0/PortfoliOS-Runtime) currently participates through optional validation only; it has no production OS release adapter.

## Setup

Use Node.js 22+ and Git. Clone the OS and Browser.JS repositories inside this orchestration checkout, following [workspace setup](../README.md#workspace-setup), then run from the orchestration root:

```sh
npm ci
npm run status
```

[workspace.json](../workspace.json) records canonical Git origins and project-owned commands. Discovery checks immediate child Git roots by origin, accepting HTTPS and SSH. Folder names can differ. Missing checkouts are reported; commands fail if a required checkout is absent or duplicated. No command clones projects, updates their branches, installs child dependencies or commits changes automatically.

## Commands

| Command from Orchestration | Behavior |
| --- | --- |
| npm run status | Show detected revisions, modified state and Runtime release status |
| npm run check | Run OS app/session/security checks and Browser build-script syntax when present |
| npm run check -- --with-runtime | Also run Runtime source and lifecycle checks; requires its checkout |
| npm run build | Build Browser.JS using its existing recipe; source must be committed and clean |
| npm run build -- --install | Also install the pinned Browser frontend dependencies through its recipe |
| npm run import:browser | Run the OS importer against the detected Browser checkout; verify revision and checksums |
| npm run deploy:dry | List the exact quick upload plan; no credentials or network required |
| npm run deploy | Run OS checks, then upload the existing site and imported assets |
| npm run deploy:full | Include the configured large engines/data; does not build or download them |
| npm test | Test orchestration discovery, credential precedence, upload boundaries/order and failure handling |

For a first Browser build, initialize its pinned Dreamland submodule as described in [its development guide](https://github.com/Bl4ut0/PortfoliOS-Browser.JS/blob/main/portfolios/DEVELOPMENT.md). The root runner invokes that same recipe rather than duplicating it. The OS is a static site and needs no bundling build. Expanding Runtime validation does not integrate it into the site.

## Release sequence

1. Validate and commit engine source in its owning repository. Run npm run build and npm run import:browser only when releasing a Browser.JS change. The importer rejects modified source, stale revision receipts and checksum mismatches.
2. Review generated OS changes. Apply the OS release/cache version process when browser-facing assets change; these commands do not invent or bump versions.
3. Run npm run check and relevant browser/lifecycle checks from the [OS integration guide](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/BROWSER_PROVIDERS.md). Review and commit the release in the affected repositories, then push using their normal release process.
4. Preview with npm run deploy:dry. Upload with npm run deploy, or use the full mode when the release requires large assets.
5. Verify the configured public URL, release/cache version and changed asset hashes. For Browser releases, compare the live release.json revision with the imported receipt. Test Desktop/Mobile entry and the changed app paths.

A deploy publishes the existing OS files; it does not build engines, import an artifact, change a version, push Git, or claim that HTTP/browser verification passed. Tooling/documentation-only changes do not require uploading the web runtime.

## Upload policy

[The OS manifest](https://github.com/Bl4ut0/PortfoliOS/blob/main/deploy.config.json) controls deployable site paths, optional documentation and large-asset exclusions. Quick mode preserves the previous large-root and gamedata exclusions. Full mode includes available configured assets. Missing default assets are counted as skipped; an explicitly requested missing path fails.

```sh
npm run deploy:dry -- --only=apps/browser,core/browser-workspace.js,index.html
npm run deploy -- --only=apps/browser,core/browser-workspace.js,index.html
```

Selections must stay within manifest roots. Traversal and symbolic links are refused. Private dotfiles, node_modules, logs and key files are excluded even inside application directories. Legal asset names containing spaces, brackets or tildes are preserved. The plan counts individual files and bytes; real uploads report byte and file progress without logging credentials. All non-HTML assets upload before embedded HTML, the service worker and the OS index. A failed upload stops the sequence immediately; FTP is not an atomic release or an automatic rollback system. Existing remote files are not deleted by this runner.

## Deployment credentials

Populate the orchestration .env privately using [.env.example](../.env.example), or supply FTP_HOST, FTP_USER and FTP_PASS through the deployment environment. FTP_PORT defaults to 21; FTP_SECURE selects FTP or FTPS; FTP_REMOTE_DIR selects the absolute server document root. FTPS validates the server certificate.

During migration, an existing ignored OS .env is read only when the orchestration .env is absent. The runner uses one file source, then lets process environment variables override it. An incomplete root .env does not silently borrow secrets from the OS file. Credentials remain local; no secret file is moved, committed, logged or uploaded. A preview does not read either credential file.

The OS node deploy.js and existing npm deployment scripts delegate to this runner when the OS lives inside a checkout whose origin is PortfoliOS-Orchestration. A standalone OS clone receives setup instructions instead of keeping a second uploader implementation. Deployment dependencies and their lockfile are versioned here; OS package scripts retain dependency-free local validation.

Published evidence: [private workspace release](releases/2026-10-10-private-workspace.md) and [application reliability release](releases/2026-10-10-app-reliability.md).

## PdfCraft release artifacts

Before a fresh OS checkout publishes PdfCraft, run `python scripts/import-pdfcraft.py` inside that checkout. The importer restores ignored, checksum-pinned official artifacts; see [the OS adapter receipt and workflow](https://github.com/Bl4ut0/PortfoliOS/tree/main/apps/pdfcraft). Deploying the PdfCraft directory checks every receipt-listed artifact before upload and fails on missing or modified bytes. This prevents publishing an installed-app launcher with an absent engine. Engine source remains [upstream](https://github.com/storytold/pdfcraft); no sibling source checkout is deployed.
