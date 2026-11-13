# Shared architecture

## Ownership

| Repository | Owns |
| --- | --- |
| [PortfoliOS-Orchestration](https://github.com/Bl4ut0/PortfoliOS-Orchestration) | Shared standards, cross-project decisions, workspace configuration and build/deploy coordination |
| [PortfoliOS](https://github.com/Bl4ut0/PortfoliOS) | Shells, chooser, accounts, SystemFS Root `/` VFS, preferences, Zero-Knowledge Vault, backup, app adapters, deployment asset policy and site releases |
| [PortfoliOS-Browser.JS](https://github.com/Bl4ut0/PortfoliOS-Browser.JS) | Browser interface, settings, host bridge and engine build |
| [PortfoliOS-Runtime](https://github.com/Bl4ut0/PortfoliOS-Runtime) | User-space Linux x86_64 POSIX Syscall Translation Table, Root `/` SystemFS VFS Bridge, Network Proxy, PTY Controller, Zero-Knowledge Vault Connector with Purge & Reset |

New app repositories follow the same pattern: engine source/build instructions in the app repository, a lightweight adapter/catalog entry in the OS, and shared decisions here. Do not duplicate OS authentication or maintain two editable engine copies.

Children remain independent Git checkouts ignored by the orchestration repository. Identify them by remote URL. Editor display names and folder names do not define repository identity.

---

## Platform Delivery Strategy

> **Desktop 1st, Mobile 2nd (Mobile Last)**
>
> All workspace decisions follow a strict **Desktop-First** architectural delivery model. The **Desktop platform is the primary milestone target** where the complete windowed operating environment, Root `/` POSIX virtual filesystem, user-space Linux x86_64 syscall translation table, Zero-Knowledge Keyring Vault, terminal developer toolchain, and creative WASM engines are built, validated, and hardened.
>
> The **Mobile platform is secondary and scheduled last across all milestone tiers**. Mobile remains an independent, lightweight touch companion sharing core services with Desktop, but all primary feature development, runtime capabilities, and system enhancements land and stabilize on Desktop before mobile touch adaptations, mobile parity, and viewport passes are executed.

---

## Startup stages

| Stage | Allowed work |
| --- | --- |
| Boot and selector | Essential script/styles, viewport setup, typed introduction and experience controls |
| Selected experience sign-in | Shared chooser and on-demand auth; download only the selected shell in the background |
| Profile selected | Activate profile storage/security; Google profiles acquire the single active lease and reconcile retained/cloud state before preferences and workspace mounting |
| Workspace ready | Continue eligible automatic private backup after the initial Google lease/recovery gate; start deferred services |
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

[The orchestration runner](../BUILD_AND_DEPLOY.md) coordinates project-owned checks, Browser builds, verified OS imports and FTP uploads. The OS owns its deployment manifest and release/cache version; app repositories retain their engine recipes and receipts. Discover child checkouts by Git origin, keep dependencies pinned, and publish assets before HTML entry points.

## Sources and implementation

- [OS component map](https://github.com/Bl4ut0/PortfoliOS/blob/main/ARCHITECTURE.md)
- [Staged loading](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/STAGED_LOADING.md)
- [Loading graph](https://github.com/Bl4ut0/PortfoliOS/blob/main/core/loading-manifest.js) and [service worker](https://github.com/Bl4ut0/PortfoliOS/blob/main/sw.js)
- [Browser host protocol](https://github.com/Bl4ut0/PortfoliOS-Browser.JS/blob/main/portfolios/INTEGRATION.md)

## Structured Access System & CLI Runtime Boundary

The PortfoliOS Runtime layer interfaces with the OS shell through a structured secondary connector boundary:

1. **Root `/` POSIX Virtual Filesystem**:
   - `SystemFS` mounts root `/`, providing standard POSIX directories (`/`, `/home/<user>`, `/usr/local/bin`, `/etc`, `/tmp`, `/documents`).
   - Boundary enforcement strictly blocks directory traversal escapes above root `/`.
2. **User-Space Linux x86_64 Syscall Translation**:
   - Implemented in `posix-syscall-table.js`, translating guest POSIX system calls (`sys_open`, `sys_read`, `sys_write`, `sys_close`, `sys_stat`, `sys_getdents64`, `sys_socket`, `sys_connect`, `sys_ioctl`, `sys_brk`) directly to browser connectors without emulated hypervisors or heavy Linux OS distributions.
3. **Zero-Knowledge Keyring Vault**:
   - Client-side AES-256-GCM + PBKDF2-HMAC-SHA512 (600,000 rounds) protects CLI tool subscriptions (`codex`, `agy`, `claude`, `xai`, `github`).
   - Plain-text credentials remain in local IndexedDB. Only the client-side encrypted envelope `/documents/vault.enc` synchronizes to cloud storage.
   - Built-in Setup & Recovery (Purge & Re-Initialize) and Visual Multi-Program Authentication Modal allow safe recovery if passwords are forgotten and simultaneous unlocking across all active programs.
4. **Git Credential Helper**:
   - `/usr/local/bin/git-credential-portfolios` services standard Git credential queries by retrieving tokens from the Zero-Knowledge Vault.
5. **Windows Native Messaging Relay**:
   - Connects to `PortfoliOS-NativeRelay` for raw TCP/UDP networking.

## Network transport policy (2026-11-12)

PortfoliOS does not host a general traffic relay or fall back to a paid/public relay. Users must install and enable the Native Relay extension and local Host Bridge for raw TCP/UDP, native CLI networking and proxy-style browsing beyond browser sandbox restrictions. Traffic then originates from their own device/network.

Without the installed relay, only browser-permitted networking is available: HTTPS requests subject to CORS, supported WebSockets/WebRTC and other browser-native capabilities. Browser/CLI/multiplayer interfaces must explain missing capabilities and offer Native Relay setup rather than selecting a remote fallback. Ordinary OS authentication and narrowly scoped backup APIs remain separate services; they are not a general traffic proxy.

Public Wisp discovery, custom Wisp selection, hosted browser allocation and the multiplayer cloud WebSocket fallback are not supported paths. Old saved fallback preferences must not reactivate them. Keep any historical relay test utilities clearly inactive. Browser.JS's external origin-isolation dependency is distinct from traffic relay hosting and must be documented separately.
