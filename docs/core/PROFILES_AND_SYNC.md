# Profiles, files and Drive backup

## Identity and presentation

Google sign-in selects that account's private workspace. Desktop and Mobile share remembered profiles and can select another Google account without merging files/settings.

Private profile selection and live Drive authorization are distinct states. Token expiry pauses backup; it does not remove the private workspace or local files/preferences. Settings, launchers, CLI and assistants must report the same current state.

Public access requires no Google sign-in. Do not show private backup-expiry prompts in public or ask active private users to sign in for local files. Offer reconnect only when needed for cloud backup.

Remembered local identity is not a server-authenticated security boundary. Continuous authenticated cloud access after reload requires an explicitly designed server-side flow.

## Public and private data

The Bl4ut0 public profile is disposable. Reload restores default public files, installation selections, preferences and layout while preserving built-in portfolio content.

Private profiles retain separate SystemFS documents, downloads, pictures, music, exposed saves and preferences. Stable account identifiers distinguish profiles; display names are presentation.

Shared engine binaries/caches are device resources, not account backups. They must not hold private document metadata. Engine-native saves/recovery databases require separate account/export verification.

Current verification and gaps are recorded in the [OS private experience audit](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/PRIVATE_EXPERIENCE_VALIDATION.md). In particular, the legacy ROM library is device-shared; document-isolation checks do not certify it or every engine-native save. Do not silently migrate or remove existing ROMs without an attributable owner and migration plan.

## Credentials and backup

Google access tokens are memory-only. Do not store bearer tokens in local/session storage, SystemFS, debug exports, URLs or iframe messages. Remembered account metadata and preferences are separate from credentials.

OS settings and shared services own Google connection and Drive orchestration. Apps save locally through SystemFS and can route users to backup settings. They do not authenticate independently or call sync.

Back up only approved user paths/settings. Exclude hidden account/system records, quarantine, executables, engine assets, models and excluded imports. Preserve scanner metadata during import/restore.

Required-path failures must not advance a successful-backup manifest/timestamp. Active identity or local save completion does not prove upload.

## Account transitions

Close/flush apps and pending writes/imports before changing scope. Capture the originating profile for async work and reject stale writes after a switch.

Save-to-Drive-before-public awaits success and retains the private profile on failure. Offline public switching preserves private local changes and does not delete remembered accounts or remote backups.

Do not silently forget accounts, delete backups, clear shared engine storage or replace remote data during normal switching. Restore preview, pagination, durable retries, conflict/deletion recovery and cross-device proof remain roadmap work until implemented and verified.

## Sources and implementation

- [Current account behavior](https://github.com/Bl4ut0/PortfoliOS/blob/main/README.md#private-sessions)
- [Live assistant session facts](https://github.com/Bl4ut0/PortfoliOS/blob/main/core/session-context.js)
- [Drive implementation](https://github.com/Bl4ut0/PortfoliOS/blob/main/core/gdrive-sync.js)
- [Mobile safe switching](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/MOBILE_APP_PARITY.md#profile-switching)
- [Remaining backup milestones](https://github.com/Bl4ut0/PortfoliOS/blob/main/ROADMAP.md)

## Desktop and icon files

Private `/Desktop` shortcut/folder contents and `/Desktop/desktop-layout.json` persist through reload and participate in normal approved-file backup. Restore saved remote Desktop state before freshly seeded defaults on first Drive sync; deliberate local customization remains a normal merge input. Public Desktop state resets with the public workspace.

Custom app artwork is stored in `/Pictures/Icon Packs/active.json`, under the same private/public profile rules. Only normalized passive PNG data is activated. Bounded portable pack imports validate completely before replacing the active pack. Async conversion and writes must retain their originating owner. The local tests cover profile isolation, reload and public reset; they do not establish a fresh cross-device Drive roundtrip.
