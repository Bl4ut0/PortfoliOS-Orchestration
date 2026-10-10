# PortfoliOS Orchestration

Shared design standards, architecture decisions and agent guidance for the PortfoliOS workspace.

Canonical repository: [Bl4ut0/PortfoliOS-Orchestration](https://github.com/Bl4ut0/PortfoliOS-Orchestration).

Start with [AGENTS.md](AGENTS.md) and [the core documentation](docs/core/README.md). Shared decisions live here; implementation contracts, source code, application catalogs and runtime releases remain in their owning repositories.

## Repositories

| Repository | Owns |
| --- | --- |
| [PortfoliOS-Orchestration](https://github.com/Bl4ut0/PortfoliOS-Orchestration) | Shared standards, agent instructions, cross-project decisions, workspace setup |
| [PortfoliOS](https://github.com/Bl4ut0/PortfoliOS) | Boot/login, Desktop/Mobile/Quick, accounts, SystemFS, app adapters, Drive backup, production deployment |
| [PortfoliOS-Browser.JS](https://github.com/Bl4ut0/PortfoliOS-Browser.JS) | Editable browser UI, browser settings, host bridge, engine build, checked release artifacts |
| [PortfoliOS-Runtime](https://github.com/Bl4ut0/PortfoliOS-Runtime) (local scaffold; publication pending) | WASM/CLI execution compatibility, profile-bound process lifecycle, capability interfaces, application recipes |

## Workspace setup

Clone this repository into a directory of your choice. From its root, clone the independent projects:

```sh
git clone https://github.com/Bl4ut0/PortfoliOS.git
git clone https://github.com/Bl4ut0/PortfoliOS-Browser.JS.git
node PortfoliOS-Browser.JS/scripts/portfolios-workspace.mjs --write
```

Open `PortfoliOS.code-workspace`. The shared guidance and projects appear as separate editor entries. Relative workspace paths are configuration, not documentation backreferences. Renamed child checkouts are detected by Git origin.

The parent repository ignores child directories by default and explicitly includes only shared documentation and orchestration tooling directories. Each child remains an independent Git checkout; a parent clone does not download its children.

For app forks and build/import details, see [the browser workspace guide](https://github.com/Bl4ut0/PortfoliOS-Browser.JS/blob/main/portfolios/WORKSPACE.md) and [OS browser integration](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/BROWSER_PROVIDERS.md).

## Maintaining shared guidance

Update common standards and [decision records](docs/core/DECISIONS.md) when an authorized change affects multiple projects. Link implementation details back to the owning Git repository. Do not duplicate app APIs, build instructions, release receipts or audit results here.

A GitHub organization is optional. Creating one or transferring repositories is a separate decision.

## Runtime planning and workspace flow

The Runtime is initialized locally as an independent child Git repository. Its GitHub identity above is planned; source and releases have not been published there yet. Its relative editor folder entry is preserved by the existing workspace generator.

~~~text
workspace/                    # PortfoliOS-Orchestration repository
  AGENTS.md
  README.md
  docs/core/
  PortfoliOS.code-workspace
  PortfoliOS/
  PortfoliOS-Browser.JS/
  PortfoliOS-Runtime/
~~~

Preserve the flow: typed experience selector -> selected Desktop/Mobile login -> profile storage activation -> selected shell mount -> eligible background services -> app-specific engines on launch. Quick retains its direct public route.

The proposed private CLI flow binds the selected project capabilities, restores valid provider auth or requests supported subscription sign-in, and starts the execution environment. Public users first select a private profile. Profile changes close processes, revoke access, drain captured-profile writes, and use the existing OS save/sync transition policy.

Only the Runtime foundation and raw-WASM worker proof are implemented locally. Full CLI compatibility, actual SystemFS integration, subscription login, credential persistence, and GitHub workflows remain planned. Proposed AI-provider credential persistence does not change the current memory-only Google Drive token policy.

Shared decisions remain in [the core standards](docs/core/README.md) and [decision record](docs/core/DECISIONS.md). Executable runtime details belong in its planned [architecture](https://github.com/Bl4ut0/PortfoliOS-Runtime/blob/main/docs/ARCHITECTURE.md), [host contract](https://github.com/Bl4ut0/PortfoliOS-Runtime/blob/main/docs/HOST_CONTRACT.md), and [roadmap](https://github.com/Bl4ut0/PortfoliOS-Runtime/blob/main/docs/ROADMAP.md). These links become available when the repository is published.
