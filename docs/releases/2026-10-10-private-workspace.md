# Private workspace and Store release

Released 2026-10-10. Site build: 2026.10.10.6.

## Source and deployment

- [OS runtime changes](https://github.com/Bl4ut0/PortfoliOS/commit/6619f02dea6ce489670ebd7063d23ff40d87c143): captured-profile filesystem guards, native Desktop/Mobile Codex CLI Preview, lazy dependencies, cache version and verified Browser import.
- [OS validation/documentation](https://github.com/Bl4ut0/PortfoliOS/commit/4e17f68): native phone theme/accent persistence and current Store/parity documentation. No runtime assets changed in this follow-up.
- [Orchestration deployment correction](https://github.com/Bl4ut0/PortfoliOS-Orchestration/commit/e04ea8d4664035edc8fbbe020b8824b4c1523276): preserve legal game filenames containing brackets, spaces and tildes; report transfer progress.
- [Imported Browser source](https://github.com/Bl4ut0/PortfoliOS-Browser.JS/tree/d9763b14cf5f62d817510a5a69b47cfc1136a585): clean source, exact revision receipt and eight verified artifact files.

Ran the orchestration full deployment command successfully: 358 files, 1294.11 MiB, no skipped entries. Assets were uploaded before embedded HTML, the service worker and the main page. Runtime lab source, experimental Codex binaries, credentials and private user data were not included.

## Verification evidence

- Nine orchestration tests, OS app/loading/Drive/security contracts and 24 Runtime tests passed. Pinned experimental CLI artifact integrity checks and local Desktop/phone WASM diagnostics passed; these are laboratory results, not production Codex functionality.
- A disposable IndexedDB audit passed 32 checks covering profile isolation, backup enumeration, recursive deletion, public reset and pending/in-flight filesystem operations across account changes.
- The staged-loading browser suite passed independent Desktop/Mobile/Quick loading, chooser-before-workspace, deferred AI/media, retry and offline cache checks.
- Local native Store checks verified actual private save/read, private file/theme/installation persistence after reload, native phone theme/accent persistence, A/B document isolation and public reset. Targeted Preview contrast checks passed 17 palette scenarios and 272 text checks. Light Desktop and phone screenshots were reviewed.
- Local Browser provider and fork UI checks passed Desktop/Mobile Settings-to-Proxy, endpoint validation, scoped persistence, public reset, closable options, retained tabs and isolation.
- Production returned the exact expected hashes for 20 release/source/Store/Browser files. All 346 deployable static asset URLs were reachable; all 79 reported Content-Length values matched local files, including the large game archives. Protected OpenRCT2 assets were checked with the runtime page as referrer; server configuration files remain inaccessible by HTTP.
- Disposable production browser contexts passed both native Store/private workflows, reload persistence, native phone preferences, A/B document separation, public reset, no public Drive reconnect prompt, no Codex engine downloads and retained cross-origin isolation. They used local test profiles and did not access the user's Google account or live browser profile.

Production entry points: [Desktop](https://os.bl4ut0.dev/?view=desktop&release=4e17f68) and [Mobile](https://os.bl4ut0.dev/?view=mobile&release=4e17f68).

## Limits and next milestones

See the [immutable OS validation report](https://github.com/Bl4ut0/PortfoliOS/blob/4e17f68/docs/PRIVATE_EXPERIENCE_VALIDATION.md) for the boundary between remembered private workspace identity and live Drive authorization. This release did not verify a fresh Google OAuth/cross-device backup round trip. Legacy ROMs remain device-shared; engine-native saves/recovery need per-engine isolation/export checks. Local profile selection is not a server login or encrypted vault.

Codex CLI Preview is a first-party readiness app with a real private SystemFS save/read action. It does not execute Codex, sign into ChatGPT or edit a project. The community WASM lab's referenced source remains unavailable and source/license correspondence is unverified. Production promotion needs reviewed source/artifacts, a captured-profile SystemFS bridge, process/network support, credential isolation and a completed supported ChatGPT subscription sign-in/inference test. Native official CLI updates do not update that browser port.
