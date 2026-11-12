# PortfoliOS Orchestration

Shared design standards, architecture decisions, agent guidance, and build/deployment coordination for the PortfoliOS workspace.

Canonical repository: [Bl4ut0/PortfoliOS-Orchestration](https://github.com/Bl4ut0/PortfoliOS-Orchestration).

Start with [AGENTS.md](AGENTS.md) and [the core documentation](docs/core/README.md). Shared decisions live here; implementation contracts, source code, application catalogs, and runtime releases remain in their owning repositories.

---

## Platform Delivery Strategy

> **Desktop 1st, Mobile 2nd (Mobile Last)**
>
> All workspace decisions follow a strict **Desktop-First** architectural delivery model. The **Desktop platform is the primary milestone target** where the complete windowed operating environment, Root `/` POSIX virtual filesystem, user-space Linux x86_64 syscall translation table, Zero-Knowledge Keyring Vault, terminal developer toolchain, and creative WASM engines are built, validated, and hardened.
>
> The **Mobile platform is secondary and scheduled last across all milestone tiers**. Mobile remains an independent, lightweight touch companion sharing core services with Desktop, but all primary feature development, runtime capabilities, and system enhancements land and stabilize on Desktop before mobile touch adaptations, mobile parity, and viewport passes are executed.

---

## Repositories

| Repository | Owns |
| --- | --- |
| [PortfoliOS-Orchestration](https://github.com/Bl4ut0/PortfoliOS-Orchestration) | Shared standards, agent instructions, cross-project decisions, workspace setup, build/deploy coordination |
| [PortfoliOS](https://github.com/Bl4ut0/PortfoliOS) | Boot/login, Desktop/Mobile/Quick shells, accounts, SystemFS Root `/` VFS, app adapters, Zero-Knowledge Keyring Vault, Drive backup, production deployment |
| [PortfoliOS-Browser.JS](https://github.com/Bl4ut0/PortfoliOS-Browser.JS) | Editable browser UI, browser settings, host bridge, engine build, checked release artifacts |
| [PortfoliOS-Runtime](https://github.com/Bl4ut0/PortfoliOS-Runtime) | User-space Linux x86_64 POSIX Syscall Translation Table, Root `/` SystemFS VFS Bridge, Network Proxy, PTY Controller, Zero-Knowledge Vault Connector with Purge & Reset |

---

## Workspace Setup

Clone this repository into a directory of your choice. From its root, clone the independent projects:

```sh
git clone https://github.com/Bl4ut0/PortfoliOS.git
git clone https://github.com/Bl4ut0/PortfoliOS-Browser.JS.git
git clone https://github.com/Bl4ut0/PortfoliOS-Runtime.git
node PortfoliOS-Browser.JS/scripts/portfolios-workspace.mjs --write
```

Open `PortfoliOS.code-workspace`. The shared guidance and projects appear as separate editor entries. Relative workspace paths are configuration, not documentation backreferences. Renamed child checkouts are detected by Git origin.

The parent repository ignores child directories by default and explicitly includes only shared documentation and orchestration tooling directories. Each child remains an independent Git checkout; a parent clone does not download its children.

---

## Build and Deployment

Run `npm ci`, then `npm run status` and `npm run check` from this root. Browser releases use `npm run build` followed by `npm run import:browser`. Preview uploads with `npm run deploy:dry`; `npm run deploy` runs OS checks and uploads the existing site.

See [the command and release guide](docs/BUILD_AND_DEPLOY.md) for credentials, targeted/full uploads, release verification, and compatibility with the existing OS commands.

For app forks and build/import details, see [the browser workspace guide](https://github.com/Bl4ut0/PortfoliOS-Browser.JS/blob/main/portfolios/WORKSPACE.md) and [OS browser integration](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/BROWSER_PROVIDERS.md).

---

## Structured Access System & Runtime Integration

The Runtime provides browser-native POSIX binary and command-line compatibility without adding heavy Linux container images or virtual machines:

1. **Root `/` POSIX Virtual Filesystem**:
   - Seamlessly mounts `/`, `/home/<user>`, `/usr/local/bin`, `/etc`, `/tmp`, and `/documents` backed by IndexedDB (`SystemFS`) with strict root boundary traversal enforcement.
2. **User-Space Linux x86_64 Syscall Translation Table**:
   - Directly translates Linux x86_64 syscalls (`sys_open`, `sys_read`, `sys_write`, `sys_close`, `sys_stat`, `sys_getdents64`, `sys_socket`, `sys_connect`, `sys_ioctl`, `sys_brk`) into browser secondary connectors.
3. **Zero-Knowledge Keyring Vault**:
   - Client-side AES-256-GCM encryption with 128-bit authentication tags and PBKDF2-HMAC-SHA512 key derivation at 600,000 rounds.
   - Synchronizes only encrypted `/documents/vault.enc` to cloud storage while strictly blocking unencrypted `/etc/portfolios/vault/` and dotfiles.
   - Built-in Setup & Recovery (Purge & Re-Initialize) and Visual Multi-Program Authentication Modal for simultaneously unlocking `codex`, `agy`, `claude`, `xai`, and `github`.
4. **Git Credential Helper**:
   - `/usr/local/bin/git-credential-portfolios` automatically services Git HTTPS authentication from stored vault tokens.
5. **Windows Native Messaging Relay**:
   - Lightweight host (`PortfoliOS-NativeRelay.msi`) and browser extension providing raw TCP/UDP networking.

Shared decisions remain in [the core standards](docs/core/README.md) and [decision record](docs/core/DECISIONS.md).
