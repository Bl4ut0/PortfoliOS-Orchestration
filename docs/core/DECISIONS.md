# Shared decision record

Record cross-repository decisions and changes to core user experience here. Keep feature tasks and release dates in the owning repository's roadmap.

A new entry states date, status, decision, reason, affected repositories, supporting Git links, acceptance evidence and any superseded entry. A proposal is not permission to implement/publish. Current user instructions can revise accepted decisions.

## CORE-001 - Shared documentation root

Date: 2026-10-10. Status: accepted.

Use [Bl4ut0/PortfoliOS-Orchestration](https://github.com/Bl4ut0/PortfoliOS-Orchestration) as the parent documentation repository. Track shared agent instructions, standards, decisions and workspace configuration. Ignore independent child checkouts and preserve their Git histories. Organization creation and repository transfer are outside this change.

Reason: agents need one common baseline while application source/releases retain clear ownership. The user selected this repository name and owner in the workspace review.

Acceptance: parent history contains no child checkout entries or Git links; the editor exposes shared guidance; child agent instructions link to canonical core documentation.

## CORE-002 - Existing experience boundaries

Date: 2026-10-10. Status: accepted, consolidated from existing requirements.

Preserve typed experience selection, native Desktop/Mobile sign-in before workspace mount, independent shell/task APIs, semantic themes, on-demand engines, shared profile services, memory-only cloud credentials and independent browser source ownership.

This records existing constraints rather than introducing a framework migration or declaring every app compliant.

Evidence: [OS source at consolidation](https://github.com/Bl4ut0/PortfoliOS/tree/64629619c4712faac4aa8043c15658160219ee1a), [browser source at consolidation](https://github.com/Bl4ut0/PortfoliOS-Browser.JS/tree/36acae7055bdc2bf3032c9944867b004bdc8ea77). The [core index](README.md) maps each rule to its implementation guide.

## CORE-003 - Documentation scope and corrections

Date: 2026-10-10. Status: accepted.

Common principles live here. Executable contracts, implementation maps, historical audits and release receipts stay in their owning project and link here through Git URLs. Preserve standalone checkouts and existing documentation routes.

Verify stale claims before consolidation. Current Drive tokens stay in memory; startup loads the selected experience; the worker caches a small boot graph and used assets rather than all Mobile apps. Caching does not prove zero latency or permission to distribute commercial assets.

Evidence: [Drive source](https://github.com/Bl4ut0/PortfoliOS/blob/64629619c4712faac4aa8043c15658160219ee1a/core/gdrive-sync.js), [loading graph](https://github.com/Bl4ut0/PortfoliOS/blob/64629619c4712faac4aa8043c15658160219ee1a/core/loading-manifest.js), [service worker](https://github.com/Bl4ut0/PortfoliOS/blob/64629619c4712faac4aa8043c15658160219ee1a/sw.js).

## RUNTIME-001 - Independent browser CLI execution layer

Date: 2026-10-10. Status: accepted architecture; implementation foundation local.

Create a separate PortfoliOS-Runtime child repository beside the OS and Browser.JS checkouts. Keep shared standards and cross-project decisions in Orchestration. Keep OS UI, profiles, SystemFS, Drive orchestration and credential policy in PortfoliOS. Runtime owns execution compatibility, process lifecycle and application recipes, exposed through explicit capabilities and loaded only on app launch.

Reason: CLI compatibility needs an independent engine/build/release lifecycle without expanding ordinary OS startup. Start with an existing execution-engine evaluation before attempting a complete kernel.

User workflow: public users select a private profile before launching the CLI category; private users authenticate separately with supported ChatGPT/Google AI subscription sign-in. Model API-key billing is not a substitute. Persistent AI-provider credentials and encrypted recovery remain design proposals, not an exception to the current memory-only Google Drive token policy.

Affected repositories: [Orchestration](https://github.com/Bl4ut0/PortfoliOS-Orchestration), [OS](https://github.com/Bl4ut0/PortfoliOS), [Browser.JS](https://github.com/Bl4ut0/PortfoliOS-Browser.JS), and planned [Runtime](https://github.com/Bl4ut0/PortfoliOS-Runtime). Runtime publication is pending.

Acceptance evidence: local private-session/workspace foundation, real raw-WASM worker proof, cancellation/teardown, and 14 automated tests. This does not demonstrate real SystemFS isolation, subscription authentication, CLI compatibility, mobile support or a production release. The [runtime roadmap](https://github.com/Bl4ut0/PortfoliOS-Runtime/blob/main/docs/ROADMAP.md) owns remaining milestones.

## BUILD-001 - Shared build and deployment coordination

Date: 2026-10-10. Status: implemented.

Move workspace command sequencing and FTP upload transport into Orchestration. Keep the deployable asset manifest, importer and site release/cache version in the OS, and keep Browser.JS's build recipe and receipt in its repository. Existing OS deployment commands delegate to the root runner. Runtime has optional checks only until a production adapter exists.

Reason: splitting source ownership should leave one discoverable workspace release entry point without duplicating engine builds or uploading sibling repositories. The user requested moving shared build/deploy tooling out of the OS.

Affected repositories: [Orchestration](https://github.com/Bl4ut0/PortfoliOS-Orchestration) and [OS](https://github.com/Bl4ut0/PortfoliOS). See [the build/deploy guide](../BUILD_AND_DEPLOY.md), [workspace command manifest](../../workspace.json) and [OS deployment policy](https://github.com/Bl4ut0/PortfoliOS/blob/main/deploy.config.json).

Acceptance: renamed checkout discovery, duplicate/missing checkout failures, quick/full/targeted upload selection, private-file and traversal exclusion, credential-free previews, asset-first ordering and child/transport failure propagation are checked by the orchestration tests. Project validation and real build/preview results are reported with the change; these tests do not constitute a production deployment.

## Decision template

- ID, date and status:
- Decision and user workflow:
- Reason and alternatives:
- Affected Git repositories:
- Source/contract links:
- Validation and limits:
- Supersedes:
