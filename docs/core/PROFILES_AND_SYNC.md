# Profiles, files and Drive backup

## Identity and presentation

Google sign-in selects that account's private workspace. Desktop and Mobile share remembered profiles and can select another Google account without merging files/settings.

Private profile selection and live Drive authorization are distinct states. Token expiry never removes local files/preferences. Google workspaces now require online session verification and lock when that verification is unavailable; local-only profiles retain their separate offline behavior. Settings, launchers, CLI and assistants must report the same current state.

Public access requires no Google sign-in. Do not show private backup-expiry prompts in public or ask active private users to sign in for local files. Offer reconnect when needed for cloud backup or active Google-session verification; retain local files while a workspace is locked.

Remembered local identity is not a server-authenticated security boundary. Continuous authenticated cloud access after reload requires an explicitly designed server-side flow.

## Public and private data

The Bl4ut0 public profile is disposable. Reload restores default public files, installation selections, preferences and layout while preserving built-in portfolio content.

Private profiles retain separate SystemFS documents, downloads, pictures, music, exposed saves and preferences. Stable account identifiers distinguish profiles; display names are presentation.

Shared engine binaries/caches are device resources, not account backups. They must not hold private document metadata. Engine-native saves/recovery databases require separate account/export verification.

Current verification and gaps are recorded in the [OS private experience audit](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/PRIVATE_EXPERIENCE_VALIDATION.md). In particular, the legacy ROM library is device-shared; document-isolation checks do not certify it or every engine-native save. Do not silently migrate or remove existing ROMs without an attributable owner and migration plan.

## Credentials and backup

Google access tokens are memory-only. Do not store bearer tokens in local/session storage, SystemFS, debug exports, URLs or iframe messages. Remembered account metadata and preferences are separate from credentials.

OS settings and shared services own Google connection and Drive orchestration. Apps save locally through SystemFS and can route users to backup settings. They do not authenticate independently or call sync.

## Pluggable Cloud Auth and Sync Drivers

PortfoliOS modularizes identity authentication and storage synchronization into extensible driver registries:
- **CloudAuth (`core/cloud-auth.js`)**: Extensible registry for OAuth 2.0 PKCE and identity providers. Built-in drivers:
  - **Google (`google`)**: Google Identity Services userinfo endpoint and token verification.
  - **Microsoft (`microsoft`)**: Microsoft Entra ID / Microsoft Graph OAuth 2.0 PKCE (`Files.ReadWrite.AppFolder` scope).
  - **Dropbox (`dropbox`)**: Dropbox OAuth 2.0 PKCE (`account_info.read`, `files.content.read`, `files.content.write`, online short-lived tokens).
  - **Nextcloud (`nextcloud`)**: Self-hosted Nextcloud server OAuth 2.0 / OCS user endpoint.
- **CloudSync (`core/cloud-sync.js`)**: Extensible registry for bi-directional file synchronization and storage management:
  - **Google Drive (`google-drive`)**: AppData / PortfoliOS sandboxed folder sync using Drive v3 REST APIs.
  - **OneDrive (`onedrive`)**: Sandboxed `/me/drive/special/approot` discovery, chunked upload, and item streaming via Microsoft Graph API v1.0.
  - **Dropbox (`dropbox`)**: Sandboxed App folder, `/2/files/*` endpoints, chunked uploads, and space usage quota.
  - **Nextcloud WebDAV (`nextcloud-webdav`)**: Standard WebDAV HTTP primitives (`PROPFIND`, `MKCOL`, `PUT`, `GET`, `DELETE`) ensuring data sovereignty.

All drivers strictly uphold memory-only token policies: bearer tokens are never written to `localStorage`, `sessionStorage`, or `SystemFS`.

## Tool credential vault policy

CLI/tool credentials use the OS-owned encrypted broker. Persist account records and saved subsystem links only in the active private profile's `/documents/vault.enc`; new plaintext `/etc` keyrings, home auth files and browser-storage token caches are prohibited. Google/other workspace sync authorization remains memory-only and is not implicitly captured as a CLI login.

The vault encrypts before every local write with AES-256-GCM, a fresh 12-byte IV, and profile-bound authenticated data. PBKDF2-HMAC-SHA512 derives its in-memory key at 600,000 rounds using a random 32-byte salt created at setup. Unlock after reload restores saved credentials and links, not a verified provider session. Provider refresh/re-authentication follows the real tool's requirements. The passphrase and decrypted records stay in memory while unlocked.

Each registered subsystem chooses a saved account and obtains temporary revocable access. Releasing access or closing an app does not delete a saved login. Unlinking affects only that consumer. A referenced login cannot be removed; after the last unlink, offer explicit removal or retention. Never automatically erase it on app close or logout. Different accounts for one provider stay distinct.

Lock, workspace lock, profile switch, teardown and peer vault replacement revoke cached access. Stale writes use expected-record/expected-absence checks. Divergent encrypted vault copies stop sync without automatic overwrite. A synthetic two-browser handoff verifies encrypted restore; this does not prove real cloud-account recovery or merge independent ciphertext. Existing v1 encrypted envelopes require their matching profile and explicit unlock. Unowned global plaintext keyrings must not be assigned to another profile or silently deleted; attributable legacy migration encrypts successfully before removing the old copy.

Purge removes the selected profile's encrypted file and unlocked access, not other profiles, provider-side tokens or existing remote recovery copies. PortfoliOS cannot recover a forgotten passphrase. Length requirements must not be advertised as a proven entropy score.

Desktop Settings/CLI own the current manager. Critical private startup restores the encrypted vault before tool access. Native CLI process launch, ephemeral auth materialization and refresh writeback, live Codex/Antigravity provider tests, real cloud restore and later Mobile adaptation remain acceptance gates. A network relay does not provide process execution. The Runtime library must consume the OS broker rather than maintain a second plaintext vault. See [the executable OS contract and verification](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/VAULT_AUTH.md).

Back up only approved user paths/settings. Exclude hidden account/system records, quarantine, executables, engine assets, models and excluded imports. Preserve scanner metadata during import/restore.

Required-path failures must not advance a successful-backup manifest/timestamp. Active identity or local save completion does not prove upload.

## Account transitions

Close/flush apps and pending writes/imports before changing scope. Capture the originating profile for async work and reject stale writes after a switch.

Save-to-Drive-before-public awaits success and retains the private profile on failure. Offline public switching preserves private local changes and does not delete remembered accounts or remote backups. It does not falsely claim that an unreachable server lease was released; another device must explicitly force takeover if the old owner cannot complete a handoff.

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

## Same-browser session coordination

Private preference saves/restores use origin-wide Web Locks, current-value snapshots and per-setting revisions. Peer tabs refresh the active profile's preferences without selecting another account. Only one tab may run Drive backup for a profile at a time; closing/failing releases ownership. Explicit preference resets survive older restores. Desktop and native Mobile themes remain separate.

This coordinates tabs in one browser storage partition, not separate devices. Timestamp-based revisions are not distributed conflict resolution; desktop-layout writes and Drive move/deletion races remain separate work. Private Store choices now use per-app revisioned records, reducing stale whole-list replacement; this does not provide distributed conflict resolution. See [the implementation and evidence](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/MULTI_SESSION.md).

## Installation retention

Private Store installation changes persist as per-app records; explicit uninstall markers take precedence over stale legacy lists. Explicitly installed Desktop shortcuts count as user customization. Backup acknowledges only paths processed successfully, preserves ambiguous local directories and active installed-app shortcuts, and rejects stale scanner metadata writes through an atomic SystemFS record check. See [implementation, regression evidence and remaining limits](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/INSTALL_RETENTION.md). This does not supply deletion tombstones, atomic folder moves or conditional cross-device Drive writes.

## One active Google workspace and recovery

A Google account has one active Desktop or Mobile workspace. Server-side verified identity, an atomic persistent lease and serialized Drive mutation gateway enforce ownership. A second session requests a handoff; the owner pauses interaction, flushes supported app saves, completes reconciliation and releases to the requester only after success. The destination reconciles before mounting. Failures block normal takeover. Force takeover requires a separate warning and preserves retained local work for recovery when that device next acquires a session.

Before reconciliation, immutable recovery deltas preserve changed approved files and explicit deletion intent. Merge against confirmed content hashes; independent preference changes merge per key, conflicting documents keep both copies, and missing local storage is never sufficient deletion proof. Expected-record/absence checks protect concurrent local changes. Recovery restores selected copies through the existing SystemFS Save As dialog. Folder presence remains conservative; atomic moves and folder deletion reconciliation remain future work.

All participating devices must reload the new release. Older running clients and external Drive editors do not participate in the gateway. The PHP deployment needs a persistent private directory outside its document root and reliable shared filesystem locks; independent server replicas are unsupported. Production Google credentials and engine-native saves were not exercised by automated fixture checks. See [the executable contract, host requirements and verification](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/SESSION_HANDOFF.md).
