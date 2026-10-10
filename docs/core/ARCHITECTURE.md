# Shared architecture

## Ownership

| Repository | Owns |
| --- | --- |
| [PortfoliOS-Orchestration](https://github.com/Bl4ut0/PortfoliOS-Orchestration) | Shared standards, cross-project decisions and workspace configuration |
| [PortfoliOS](https://github.com/Bl4ut0/PortfoliOS) | Shells, chooser, accounts, SystemFS, preferences, backup, app adapters and deployment |
| [PortfoliOS-Browser.JS](https://github.com/Bl4ut0/PortfoliOS-Browser.JS) | Browser interface, settings, host bridge and engine build |

New app repositories follow the same pattern: engine source/build instructions in the app repository, a lightweight adapter/catalog entry in the OS, and shared decisions here. Do not duplicate OS authentication or maintain two editable engine copies.

Children remain independent Git checkouts ignored by the orchestration repository. Identify them by remote URL. Editor display names and folder names do not define repository identity.

## Startup stages

| Stage | Allowed work |
| --- | --- |
| Boot and selector | Essential script/styles, viewport setup, typed introduction and experience controls |
| Selected experience sign-in | Shared chooser and on-demand auth; download only the selected shell in the background |
| Profile selected | Activate profile storage/security/preferences, then mount the selected workspace |
| Workspace ready | Begin eligible private backup and deferred services without blocking on a full upload |
| App opened | Load that app's controls, styles, engine, WASM, workers, fonts and other expensive assets |

Prefetch downloads without evaluating code or mounting HTML. Mobile entry must not initialize Desktop controllers, window management or Desktop-only styles. Keep selection/sign-in responsive, with actionable recovery when preparation fails.

## Services and state

Share neutral data, profile/storage APIs, media, backup and file intents. Keep Desktop and Mobile catalogs, presentation and task/window APIs independent. Use existing state/event APIs rather than competing stores.

AI, media indexing, thumbnails and heavy runtimes initialize only for their consumers. Installed icons do not start engines. Pause unnecessary interactive work during login, backgrounding, minimize or Home.

Preserve cross-origin isolation required by existing WASM/AI. Do not weaken the main shell headers to embed another app. Trusted same-origin iframes are privileged code; credentialless storage does not prevent same-origin DOM access.

## Caching and releases

Keep the small boot cache separate from used shell/app assets and installed binaries. Cache optional assets on use or explicit install; do not precache the expanding app library.

Previously used assets may support offline entry. Do not promise offline availability for never-downloaded apps, zero latency or Google reconnection without a network.

Separate shared runtime caches from account documents and Drive backup. Public reset must not erase private files. Evaluate each engine's own persistence and save export independently.

Import builds with immutable source revisions and checksums. For runtime releases, publish referenced assets before entry documents and verify the deployed version. A shared-documentation change does not require rebuilding engines.

## Sources and implementation

- [OS component map](https://github.com/Bl4ut0/PortfoliOS/blob/main/ARCHITECTURE.md)
- [Staged loading](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/STAGED_LOADING.md)
- [Loading graph](https://github.com/Bl4ut0/PortfoliOS/blob/main/core/loading-manifest.js) and [service worker](https://github.com/Bl4ut0/PortfoliOS/blob/main/sw.js)
- [Browser host protocol](https://github.com/Bl4ut0/PortfoliOS-Browser.JS/blob/main/portfolios/INTEGRATION.md)
