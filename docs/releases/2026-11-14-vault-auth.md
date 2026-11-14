# Encrypted tool credentials: proposed release 2026.11.14.1

Status: validated and committed locally; publication/production upload pending.

OS source: [e6b5978ec48500d58733253c14bfd4cc87b935f5](https://github.com/Bl4ut0/PortfoliOS/commit/e6b5978ec48500d58733253c14bfd4cc87b935f5).

The release also includes the previously prepared opt-in relay policy and checked Browser.JS artifact at [9bf26d38](https://github.com/Bl4ut0/PortfoliOS-Browser.JS/commit/9bf26d38). No hosted/public traffic fallback is introduced. All changes are in their owning repositories; Orchestration tracks only shared policy and release evidence.

## Resulting behavior

- Private saved tool accounts and consumer links persist only inside encrypted `/documents/vault.enc`. Unlock after reload restores them without inferring live provider authentication from an OS account.
- Desktop Saved Logins imports real Codex login JSON directly into encrypted storage. Multiple accounts remain separate; one login can serve several explicitly linked consumers. Disconnecting an app does not delete another subsystem's login. Unused removal is explicit and confirmed.
- Lock, profile changes, workspace handoff and peer vault updates revoke temporary access. Metadata-only backup inspection can rebase an unchanged encrypted record while retaining the atomic write guard.
- Private startup restores vault ciphertext with critical shell state before tools run. Targeted restore does not advance unprocessed files' merge baseline or the successful full-backup timestamp. Divergent encrypted vaults stop sync with copies retained. Offline document conflicts receive immutable recovery snapshots before replacement; Cancel Sync keeps the original copies.
- Unowned historical plaintext keyrings stay hidden and are neither assigned nor silently deleted. Matching scoped records can migrate after unlock. Local purge does not erase another profile, historical files or remote recovery copies.

## Verification

- OS `npm test` exits successfully: app/loading/window contracts, scanner, merge logic, cloud drivers, runtime adapter, encrypted broker, opaque vault conflict/partial-restore cases and network policy report completion. The older Google session unit script still exits without its final success marker; it is not counted as proof of provider sign-in or complete coverage.
- `check-credential-vault-browser.js` completes against real disposable IndexedDB: two accounts, shared consumers, ciphertext-only writes, reload/unlock, cancelled unlock, explicit removal/retention, narrow viewport, cross-tab revocation, unowned-keyring preservation and profile filesystem checks. No external provider requests.
- `check-private-handoff-browser.js` completes with independent browser contexts and synthetic Drive/session services: encrypted Codex credentials transfer and unlock, the previous workspace loses access, normal backup preserves access, and failed-save retry, offline conflicts, cancel/retry, hash-checked recovery, tombstones, forced takeover and public release pass. Fixture waits now follow completed entry attempts and explicit deferred document restore; the recovery version is selected by content, not row order.
- `check-staged-loading-browser.js` completes for Desktop/Mobile/Quick isolation and deferred startup. Local fixture timings are not production performance measurements.
- Orchestration `npm test`: 19 passing tests.
- Existing native `codex login status` detects a cached ChatGPT login. No real auth file was read/imported, login modified, refresh performed or authenticated provider request made by these checks.

## Deployment plan

Credential-free `deploy --changed --dry-run` selects 20 files / 4.00 MiB, including the checked Browser artifact, Native Relay SDK policy, new vault broker, changed OS controllers/styles, selected workspace HTML and release/cache entry points. Assets precede HTML/service worker/index. No credentials are loaded and no upload occurs during preview. Tests, documentation, local browser fixtures and native auth files are outside the site payload.

Publish OS, Browser.JS and Orchestration commits, then use the configured changed deployment and verify the live release marker, changed asset hashes and Browser receipt. Production verification remains pending until upload. Rollback must preserve private filesystem data and encrypted vault files; do not re-enable plaintext credential fallback or purge accounts to roll back presentation.

## Remaining gates

The real native CLI process/PTY connector, scoped ephemeral credential materialization, encrypted writeback after login/refresh, and a successful provider request after reload/unlock remain open. Antigravity requires its own verified login/connector recipe. Synthetic cloud restore does not establish a production Google-account roundtrip, automatic merging of independently changed encrypted vaults, or a native Mobile manager. Older running clients must reload and historical plaintext remnants need owner-confirmed cleanup.

See [the executable OS contract](https://github.com/Bl4ut0/PortfoliOS/blob/e6b5978ec48500d58733253c14bfd4cc87b935f5/docs/VAULT_AUTH.md), [shared account policy](../core/PROFILES_AND_SYNC.md), and [AUTH-003](../core/DECISIONS.md#auth-003---persistent-encrypted-tool-accounts-and-subsystem-access).
