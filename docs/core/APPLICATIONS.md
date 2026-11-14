# Shared application standards

## Contracts and native presentation

Use the owning repository's existing framework. Do not introduce a second registry or speculative universal API.

Desktop apps own their modules/styles and register through the Desktop catalog, loader and framework. Use window presets and geometry variables; the window manager owns root display and visibility.

Mobile uses its own catalog, loader, view classes and phone lifecycle. Share neutral services/engines with native phone controls and Home/Back/Recents. Keep availability honest for unsupported or experimental ports.

Executable Desktop signatures remain in [MODULAR_APPS.md](https://github.com/Bl4ut0/PortfoliOS/blob/main/MODULAR_APPS.md). Mobile signatures remain in [its framework](https://github.com/Bl4ut0/PortfoliOS/blob/main/mobile/app-framework.js). These common requirements do not replace either API.

## Lifecycle and resources

Initialize once on open. Focus/resume must not duplicate listeners, workers, animation loops, audio nodes or connections.

Keep slow startup cancellable. Close/profile changes must prevent late callbacks updating detached views or writing into the next account. Flush required saves, then release workers, timers, listeners, object URLs, frames and pointer lock.

Pause interactive work on minimize/Home and resume retained tasks. Deliberate background music belongs to the shared media service. Re-measure editors/canvases after maximize, resize, rotation and keyboard changes.

Respect shared volume and focus controls. Document upstream engine limitations rather than pretending an OS control succeeded.

## Files and engine boundaries

Apps save through profile-scoped SystemFS and approved file intents. They do not own Google authentication or invoke Drive backup directly.

Import selected files through the existing scanner/quarantine flow. Do not globally relax executable/active-format restrictions for an editor.

Engine IndexedDB, OPFS, local storage and recovery drafts are separate persistence surfaces. Partition, avoid or explicitly export them before claiming account isolation or backup. Keep binaries, models, ROMs, caches and credentials outside document backup.

Worker/iframe bridges transfer selected data and explicit operations. Validate origin, source window, schema and operation limits. Do not pass Google tokens, broad filesystem access or another profile's data to an engine.

## Independent application repositories

Record upstream source, notices, source commit, toolchain, artifact checksum and rollback procedure. Import checked releases through a narrow OS adapter.

Browser, multiplayer and CLI networking remains subject to browser sandbox restrictions until the user installs and enables the Native Relay extension and local Host Bridge or explicitly configures a compatible user-owned transport supported by that app. PortfoliOS does not offer hosted/public relay fallback or operate a general destination-traffic relay. Destination traffic uses the user’s device/network or explicitly chosen relay operator. Browser content isolation is a separate dependency, not a relay fallback.

Maintain correspondence between deployed modified runtimes and exact source revisions. Catalog/demo links do not prove local integration, mobile support or save/restore.

Verify useful open/import/edit-or-play/save/reopen, close-during-startup, pause/resume, profile switching, public reset and recovery. Claimed Mobile support needs touch, safe-area, keyboard, orientation and real-device checks.

Measure heavy runtimes before promising download, memory or launch budgets. Run relevant appearance/loading/account checks for affected runtime paths; documentation-only changes do not require unrelated engine suites.

## Sources and implementation

- [Desktop contracts/templates](https://github.com/Bl4ut0/PortfoliOS/blob/main/MODULAR_APPS.md)
- [Mobile contracts](https://github.com/Bl4ut0/PortfoliOS/blob/main/mobile/README.md) and [parity map](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/MOBILE_APP_PARITY.md)
- [WASM integration requirements](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/wasm/INTEGRATION.md)
- [Browser build](https://github.com/Bl4ut0/PortfoliOS-Browser.JS/blob/main/portfolios/DEVELOPMENT.md) and [host protocol](https://github.com/Bl4ut0/PortfoliOS-Browser.JS/blob/main/portfolios/INTEGRATION.md)


## Shared sounds and music tools

The OS owns the public sample index and deferred `SoundLibrary` service. Apps can request shared sample maps as fallback while retaining their own supplied sounds. Packs carry stable IDs, file hashes and license/source metadata; new files and the regenerated index publish together. This public asset library is separate from private user recordings and project files in SystemFS. See [sound-pack authoring and the API](https://github.com/Bl4ut0/PortfoliOS/blob/main/data/sounds/README.md).

Loop Studio is a first-party Desktop adapter over a pinned, unmodified Strudel engine. Keep its engine/sample loads outside boot/login, use the common audio adapter and file dialogs, and terminate audio on minimize/close/profile changes. Generative music input uses bounded pattern expressions and reviewed drafts. Its MCP transport is browser-local and profile-scoped; external HTTP/stdio clients require a separate user-controlled transport adapter. Native Mobile and real local-model musical quality remain separate gates. See [the app contract](https://github.com/Bl4ut0/PortfoliOS/blob/main/apps/loop-studio/README.md).
