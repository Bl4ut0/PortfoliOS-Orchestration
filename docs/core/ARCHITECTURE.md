# Shared architecture

## Ownership

| Repository | Owns |
| --- | --- |
| [PortfoliOS-Orchestration](https://github.com/Bl4ut0/PortfoliOS-Orchestration) | Shared standards, cross-project decisions, workspace configuration and build/deploy coordination |
| [PortfoliOS](https://github.com/Bl4ut0/PortfoliOS) | Shells, chooser, accounts, SystemFS, preferences, backup, app adapters, deployment asset policy and site releases |
| [PortfoliOS-Browser.JS](https://github.com/Bl4ut0/PortfoliOS-Browser.JS) | Browser interface, settings, host bridge and engine build |
| [PortfoliOS-Runtime](https://github.com/Bl4ut0/PortfoliOS-Runtime) (local scaffold; publication pending) | CLI execution compatibility, process lifecycle, capability interfaces and application recipes |

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

## Build and deployment ownership

[The orchestration runner](../BUILD_AND_DEPLOY.md) coordinates project-owned checks, Browser builds, verified OS imports and FTP uploads. The OS owns its deployment manifest and release/cache version; app repositories retain their engine recipes and receipts. Runtime remains validation-only until a release adapter is implemented and tested. Discover child checkouts by Git origin, keep dependencies pinned, and publish assets before HTML entry points.

## Sources and implementation

- [OS component map](https://github.com/Bl4ut0/PortfoliOS/blob/main/ARCHITECTURE.md)
- [Staged loading](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/STAGED_LOADING.md)
- [Loading graph](https://github.com/Bl4ut0/PortfoliOS/blob/main/core/loading-manifest.js) and [service worker](https://github.com/Bl4ut0/PortfoliOS/blob/main/sw.js)
- [Browser host protocol](https://github.com/Bl4ut0/PortfoliOS-Browser.JS/blob/main/portfolios/INTEGRATION.md)

## CLI runtime boundary

The separate Runtime is loaded on application launch. PortfoliOS keeps profile selection, SystemFS, credential policy, Drive sync and native Desktop/Mobile adapters. Runtime engines receive explicit captured-profile/project capabilities and must support cancellation and teardown before profile changes. Shared standards remain in this repository; executable runtime contracts remain with runtime source.

The private CLI experience requires a private PortfoliOS profile and separate supported provider authentication. Subscription sign-in is the goal; model API-key billing does not satisfy it. Runtime-vendor service requirements need independent evaluation. Native CLI auth does not prove browser compatibility. Credential persistence and encrypted recovery remain proposals; current Google Drive access tokens stay memory-only.

Current implementation: local raw-WASM worker proof, host-side session/workspace foundation, and an experimental community Codex WASM installation lab. The lab uses disposable test data, denies external networking, and verifies diagnostics and lifecycle only. Reproducible source/license correspondence and supported subscription authentication remain promotion gates; see the [runtime installation findings](https://github.com/Bl4ut0/PortfoliOS-Runtime/blob/main/docs/CLI_INSTALLATION.md). The OS Store offers a first-party Codex CLI Preview with a real private SystemFS save/read check and official native setup guidance. It does not download or execute the experimental binary. Full CLI compatibility, guest SystemFS integration, provider authentication and GitHub operations are not implemented. See the [OS validation boundaries](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/PRIVATE_EXPERIENCE_VALIDATION.md). See the planned [runtime contract](https://github.com/Bl4ut0/PortfoliOS-Runtime/blob/main/docs/HOST_CONTRACT.md) and [roadmap](https://github.com/Bl4ut0/PortfoliOS-Runtime/blob/main/docs/ROADMAP.md); publication is pending.
