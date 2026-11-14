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

User workflow: public users select a private profile before launching the CLI category; private users authenticate separately with supported ChatGPT/Google AI subscription sign-in. Model API-key billing is not a substitute. Persistent AI-provider credentials and multi-device recovery are implemented via the client-side Zero-Knowledge AES-256-GCM Vault (`vault.enc`), maintaining the rule that plain-text tokens are never written to cloud storage.

Affected repositories: [Orchestration](https://github.com/Bl4ut0/PortfoliOS-Orchestration), [OS](https://github.com/Bl4ut0/PortfoliOS), [Browser.JS](https://github.com/Bl4ut0/PortfoliOS-Browser.JS), and planned [Runtime](https://github.com/Bl4ut0/PortfoliOS-Runtime). Runtime publication is pending.

Acceptance evidence: local private-session/workspace foundation, real raw-WASM worker proof, cancellation/teardown, and 14 automated tests. This does not demonstrate real SystemFS isolation, subscription authentication, CLI compatibility, mobile support or a production release. The [runtime roadmap](https://github.com/Bl4ut0/PortfoliOS-Runtime/blob/main/docs/ROADMAP.md) owns remaining milestones.

## BUILD-001 - Shared build and deployment coordination

Date: 2026-10-10. Status: implemented.

Move workspace command sequencing and FTP upload transport into Orchestration. Keep the deployable asset manifest, importer and site release/cache version in the OS, and keep Browser.JS's build recipe and receipt in its repository. Existing OS deployment commands delegate to the root runner. Runtime has optional checks only until a production adapter exists.

Reason: splitting source ownership should leave one discoverable workspace release entry point without duplicating engine builds or uploading sibling repositories. The user requested moving shared build/deploy tooling out of the OS.

Affected repositories: [Orchestration](https://github.com/Bl4ut0/PortfoliOS-Orchestration) and [OS](https://github.com/Bl4ut0/PortfoliOS). See [the build/deploy guide](../BUILD_AND_DEPLOY.md), [workspace command manifest](../../workspace.json) and [OS deployment policy](https://github.com/Bl4ut0/PortfoliOS/blob/main/deploy.config.json).

Acceptance: renamed checkout discovery, duplicate/missing checkout failures, quick/full/targeted upload selection, private-file and traversal exclusion, credential-free previews, asset-first ordering and child/transport failure propagation are checked by the orchestration tests. Project validation and real build/preview results are reported with the change; these tests do not constitute a production deployment.

## PdfCraft: unmodified engine, isolated host file bridge

Date: 2026-10-11. Status: implemented in the OS.

Use the official checksum-pinned PdfCraft web release with an opaque sandbox and native SystemFS Open/Save controls. Keep editable engine source upstream, ignored release artifacts outside Git, and adapter/catalog/provenance in [PortfoliOS](https://github.com/Bl4ut0/PortfoliOS/tree/main/apps/pdfcraft). The exact owned frame alone may send bounded document messages. Runtime public-asset CORS does not grant access to user storage or tokens.

Desktop applications may provide an optional asynchronous `beforeClose` hook. Returning false preserves the window; profile switching runs guards before closing any apps or changing identity. Dirty PdfCraft edits and failed output writes veto destruction. `onClose` remains teardown after approval. See [integration evidence and limits](https://github.com/Bl4ut0/PortfoliOS/blob/main/apps/pdfcraft/README.md).

Native interaction follow-up: keep the editor as the application surface. Its file-input requests enter a contextual OS file dialog through a first-party browser-environment adapter; the loaded OS profile determines storage. Do not add a permanent wrapper workspace/file dropdown alongside an editor that already exposes Open/Save. File Explorer launch parameters use the same scoped Open path. Upstream engine artifacts remain unmodified.

PhotoCraft, VectorCraft, mobile editing, portable engine recovery and broad upstream-feature certification remain separate evaluations. A working PDF import/edit/save/reopen flow does not certify the whole suite.

## 2026-10-11: bounded Craft adapters and Code OSS Documents provider

The six additional Craft browser-download engines use one bounded first-party bridge for native file input, contextual SystemFS dialogs and Blob downloads. Opaque frames never gain parent-origin DOM/IndexedDB or credentials. Their pinned compiled engines are unmodified. PdfCraft retains its proven adapter. Engine-local settings are ephemeral except LightCraft's explicit profile-owned files-store checkpoint. A native project acknowledgement is required before closing; ambiguous multi-document editors additionally require explicit confirmation.

Code OSS uses an actual web workbench and a Documents-only filesystem provider. UTF-8 source saved by its local writer is inert text; general import and cloud active-content quarantine remain unchanged. Native terminals/extensions are a separate runtime decision. Heavy engines stay out of boot/login. See [per-app evidence and remaining gates](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/ARTCRAFT_REVIEW.md). This supersedes the earlier statement that PhotoCraft/VectorCraft adapters were wholly future work, without promoting every upstream tool to verified status.

Desktop Auto fills the dynamic browser viewport at every CSS width, including foldables. A width breakpoint may alter window presentation, but must not shrink the chosen Desktop into a preview. Mobile remains independent.

## Decision template

- ID, date and status:
- Decision and user workflow:
- Reason and alternatives:
- Affected Git repositories:
- Source/contract links:
- Validation and limits:
- Supersedes:

### 2026-10-11: Desktop and app artwork are profile files

Use actual `/Desktop` files for shortcuts/folders and its layout JSON for icon positions/seeding. Keep custom icon overrides in `/Pictures/Icon Packs/active.json`, keyed by app ID and shared across experiences. Default upstream artwork remains checked-in, attributed and independent of user files. Portable packs contain bounded normalized PNG data, not URLs, executable markup or app code. See [OS Desktop implementation](https://github.com/Bl4ut0/PortfoliOS/blob/main/desktop/README.md) and [icon contract](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/APP_ICONS.md).

## 2026-10-11: One active Google workspace with recoverable handoff

The user selected a single active private session instead of simultaneous cross-device editing. Normal takeover must save and sync the previous workspace before releasing ownership. An explicitly forced takeover cannot save an unreachable device, so retain its last uploaded recovery delta and reconcile its remaining local changes when that device next becomes active. Public access remains unrestricted. Google workspace entry now waits for online ownership verification and reconciliation before mounting the selected shell. Preserve conflicting versions and explicit deletion intent rather than using timestamp-only overwrite decisions.

Implemented scope and limits: [OS session handoff framework](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/SESSION_HANDOFF.md). This decision does not claim engine-native save coverage, atomic folder moves, independent-server coordination or retroactive protection of older loaded clients.


## STRATEGY-001 - Platform Milestone Delivery Priority: Desktop 1st, Mobile 2nd (Mobile Last)

Date: 2026-11-12. Status: accepted workspace policy.

All future milestone planning, feature development, and architectural verification strictly follow a **Desktop-First** progression order:
1. **Desktop platform is prioritized first**: The complete windowed workspace, Root `/` POSIX Virtual Filesystem, user-space Linux syscall table, Zero-Knowledge Keyring Vault, terminal developer toolchain, and creative WASM suites are built, validated, and hardened on Desktop.
2. **Mobile platform is secondary and scheduled last**: Mobile remains an independent, lightweight touch companion sharing core services with Desktop. All primary feature development and system capabilities must land and stabilize on Desktop before mobile touch adaptations, mobile parity, and viewport passes are executed.

Reason: Desktop represents the complete productivity and development surface for PortfoliOS. Hardening the complex window manager, POSIX filesystem, native terminal, and Zero-Knowledge Keyring on Desktop establishes a stable core baseline before adapting interfaces to mobile touch viewports.

Affected repositories: [Orchestration](https://github.com/Bl4ut0/PortfoliOS-Orchestration), [OS](https://github.com/Bl4ut0/PortfoliOS), and [Runtime](https://github.com/Bl4ut0/PortfoliOS-Runtime).

## SECURITY-002 - Zero-Knowledge Vault Recovery (Purge & Re-Initialize) and Multi-Program Authentication

Date: 2026-11-12. Status: implemented.

Because client-side AES-256-GCM + PBKDF2 (600,000 rounds) encryption is strictly Zero-Knowledge, lost or forgotten Master Passphrases cannot be decrypted or backdoored. To prevent users from getting permanently locked out or having corrupted session states:
1. **Safe Purge & Reset**: Implemented `vault purge` / `window.PortfoliOSVault.purgeAndReset()`. When confirmed (`Type 'PURGE'`), it purges in-memory keys, removes `/etc/portfolios/vault/*.json`, and deletes `/documents/vault.enc`, enabling the user to immediately initialize a new Master Passphrase cleanly without corrupting other files.
2. **Visual Multi-Program Authentication Modal**: Implemented `#vault-modal` supporting simultaneous credential unlocks for all active CLI tools (`codex`, `agy`, `claude`, `xai`, `github`) with real-time decryption and error handling.

Affected repositories: [OS](https://github.com/Bl4ut0/PortfoliOS) and [Runtime](https://github.com/Bl4ut0/PortfoliOS-Runtime).

## 2026-11-12: Native Relay, no hosted traffic fallback

User decision: do not operate/pay for a fallback relay or route user destination traffic through PortfoliOS hosting. Until the user installs and enables the Native Relay extension and local Host Bridge, browser, multiplayer and CLI networking remains constrained by browser sandbox capabilities. Do not automatically select public/community Wisp, paid remote browsers or central WebSocket-to-UDP relays. Existing tightly scoped OS auth/backup APIs are not changed by this decision. This supersedes older fallback descriptions.

User clarification: retain explicit custom relay/proxy options where the app implements the protocol. Native Relay and user-configured Wisp/compatible game relay are valid opt-in choices; no configured transport means sandbox-limited networking with setup guidance. VPNs can route device traffic but do not replace a browser transport. No automatic relay list, service-owned default or paid fallback.


## AUTH-003 - Persistent encrypted tool accounts and subsystem access

Date: 2026-11-14. Status: OS implementation and local fixture validation; native CLI provider roundtrip remains open.

The vault is the persistent source of tool credentials. Save encrypted account records and explicit consumer bindings; use revocable temporary access while a subsystem is running. Keep referenced credentials. When the final subsystem is unlinked, offer removal with confirmation or retain for later. Closing a tool never deletes its saved login. Multiple provider accounts are independent, and PortfoliOS workspace identity never fabricates tool authentication.

Use Codex auth-file import as the first concrete storage workflow. New credentials persist only in profile-bound `/documents/vault.enc`; passphrases and plaintext stay in memory. Unowned historical keyrings are hidden and preserved rather than assigned to a new user. A matching old encrypted envelope can be explicitly unlocked/upgraded. Scoped legacy plaintext migration encrypts before deletion. This supersedes the plaintext-device-keyring and purge-all claims in SECURITY-002; local purge does not erase historical records, other profiles or remote recovery copies.

Affected repositories: [OS](https://github.com/Bl4ut0/PortfoliOS) owns executable storage/UI/bridge; [Orchestration](https://github.com/Bl4ut0/PortfoliOS-Orchestration) owns this contract; [Runtime](https://github.com/Bl4ut0/PortfoliOS-Runtime) must consume the OS service when its production process adapter is connected. No duplicate credential authority.

Verification: broker regressions and a real IndexedDB/browser fixture cover shared consumers, two accounts, reload/unlock, cancellation, public/private isolation, unused cleanup and ciphertext-only writes. Synthetic fixtures make no provider requests. A separate synthetic Drive/session handoff fixture restores encrypted Codex credentials between isolated browsers, revokes old access, and covers offline conflict recovery/cancellation. Targeted startup passes keep prior baselines for untouched files. Live CLI launch, login/refresh writeback, an authenticated request after reload, real cloud recovery and Mobile adaptation remain open. See [the executable contract](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/VAULT_AUTH.md).


## MUSIC-001 - Native live-coding music and a shared sample index

Date: 2026-11-14. Status: published as release 2026.11.14.2; see [release evidence](../releases/2026-11-14-loop-studio.md).

Use a self-hosted checksum-pinned Strudel Web Audio engine behind a native Loop Studio editor. Interpret a bounded pattern-expression subset through allowed library calls rather than evaluating arbitrary user/model JavaScript. Preserve the current running pattern after invalid edits, shared OS volume/mute, user-reviewed model proposals, SystemFS project/recording saves, and real discard/close behavior.

Keep shared public sound packs under the OS's `data/sounds`, with a generated catalog of stable sound IDs, categories, sizes, hashes and actual license/source metadata. Apps can use this as a fallback when they have no sound bank. Source/audio files and catalog publish together; index refresh is explicit, and content hashes identify updated sample bytes. Public static assets never enumerate private SystemFS recordings.

Only explicit playback loads the Strudel bundle and needed samples. Used code/sounds can be cached without expanding the boot precache. The existing Local AI service remains off until enabled by the user; music composition is local-only at entry and dispatch. Five scoped MCP tools use a local MessagePort and cannot save files, start playback or access the vault/network.

Affected repositories: [OS](https://github.com/Bl4ut0/PortfoliOS) owns the application, index, importer, source/license notices and tests; [Orchestration](https://github.com/Bl4ut0/PortfoliOS-Orchestration) owns these shared standards and release coordination. The Strudel engine remains upstream and unmodified.

Evidence: actual Web Audio signal and recording, shared sample changes, system mute, native file dialogs, private reload/isolation, cancellation/discard, minimize/close, offline replay after loading, theme/narrow-layout checks, model-plumbing fixtures and MCP initialize/list/call tests. This does not certify native Mobile, real phone audio latency, every Strudel function, real model composition quality or an externally reachable MCP server. [App contract](https://github.com/Bl4ut0/PortfoliOS/blob/main/apps/loop-studio/README.md), [sound library](https://github.com/Bl4ut0/PortfoliOS/blob/main/data/sounds/README.md).
