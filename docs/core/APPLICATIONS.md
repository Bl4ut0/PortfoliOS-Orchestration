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

Browser traffic stays on an authorized external relay/content isolation service. The OS must not silently become a destination-traffic relay. Provider changes are explicit and connection options dismissible.

Maintain correspondence between deployed modified runtimes and exact source revisions. Catalog/demo links do not prove local integration, mobile support or save/restore.

Verify useful open/import/edit-or-play/save/reopen, close-during-startup, pause/resume, profile switching, public reset and recovery. Claimed Mobile support needs touch, safe-area, keyboard, orientation and real-device checks.

Measure heavy runtimes before promising download, memory or launch budgets. Run relevant appearance/loading/account checks for affected runtime paths; documentation-only changes do not require unrelated engine suites.

## Sources and implementation

- [Desktop contracts/templates](https://github.com/Bl4ut0/PortfoliOS/blob/main/MODULAR_APPS.md)
- [Mobile contracts](https://github.com/Bl4ut0/PortfoliOS/blob/main/mobile/README.md) and [parity map](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/MOBILE_APP_PARITY.md)
- [WASM integration requirements](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/wasm/INTEGRATION.md)
- [Browser build](https://github.com/Bl4ut0/PortfoliOS-Browser.JS/blob/main/portfolios/DEVELOPMENT.md) and [host protocol](https://github.com/Bl4ut0/PortfoliOS-Browser.JS/blob/main/portfolios/INTEGRATION.md)
