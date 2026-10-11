# Desktop files and application icons

Published 2026-10-11 to [PortfoliOS](https://os.bl4ut0.dev/?release=1b6e819).

## Revisions and scope

- [Desktop implementation 1f60aac](https://github.com/Bl4ut0/PortfoliOS/commit/1f60aac): actual `/Desktop` shortcuts/folders, square icon grid, file-backed positions, native folder creation, Explorer navigation and safe first-restore behavior. Runtime build `2026.10.11.7`.
- [Icon implementation 1b6e819](https://github.com/Bl4ut0/PortfoliOS/commit/1b6e819): attributed local artwork, profile custom icons, portable pack import/export and shared Desktop/Mobile rendering. Runtime build `2026.10.11.8`.
- Concurrent administration work in 73acf37 was authored and published separately; this task's upload selection excluded its server/admin assets. The shared loading manifest and profile writer hook were included in that concurrent source commit. Unrelated Browser edits remain untouched.

## Delivered behavior

Desktop contents and layout live under `/Desktop` in the active SystemFS. Default launchers are actual JSON shortcut files. Dragging a launcher into a folder moves its file; moving/deleting defaults does not recreate them on reload. Private legacy positions migrate only after a durable save. First Drive restore prefers saved remote Desktop state over newly generated defaults, preserving intentional local edits.

Desktop and Mobile Appearance accept per-app PNG/JPEG/WebP images and PortfoliOS JSON icon packs. Images are checked and normalized to passive 128-pixel PNGs. `/Pictures/Icon Packs/active.json` belongs to the selected profile and is eligible for normal backup. Private choices persist; public choices reset. Shared app IDs get the same icon in both experiences. Existing upstream logos are retained, OpenRCT2/Webamp sources and licenses are pinned, and local colored glyph tiles cover purpose-built tools and future fallbacks. The OS brand mark is unchanged.

See [icon usage and format](https://github.com/Bl4ut0/PortfoliOS/blob/1b6e819/docs/APP_ICONS.md) and [Desktop implementation](https://github.com/Bl4ut0/PortfoliOS/blob/1f60aac/desktop/README.md).

## Evidence

- OS app, loading, Google session and SecurityKernel checks passed.
- Desktop folder browser checks passed locally and on build `.7`: native modal validation, real shortcut movement, metadata-free restored shortcut association, private reload/isolation, legacy migration, race cancellation, public reset and square snapping at four viewport sizes. Desktop viewport checks covered fold/cover, rotation, browser height and fixed resolution.
- Icon browser checks passed locally and on production `.8`: 44 Desktop/catalog and 24 Mobile entries decoded, native Appearance upload, immediate taskbar/title refresh, import/export, invalid-pack retention, private reload/isolation, stale conversion rejection, shared Mobile choices, Mobile Store icons and public reset.
- Staged-loading browser checks passed: selected-shell isolation, account gate, lazy services, retries and offline cache behavior.
- Targeted deployments completed: 15 files / 0.38 MiB for Desktop, 65 files / 0.42 MiB for icons. Production build metadata is `.8`; 54 changed runtime/artwork hashes matched, including all 37 SVG/PNG artwork files checked.

## Limits

These tests use disposable local profile fixtures, not the user's Google credentials. No new cross-device Drive roundtrip is claimed. Desktop state covers files and positions, not complete restoration of running windows. Linux themes and Android icon APKs require conversion; a curated external pack catalog is future work. Artwork coverage does not certify every application engine.

## Store shortcut follow-up: 2026.10.11.9

[OS commit 03f9418](https://github.com/Bl4ut0/PortfoliOS/commit/03f9418) makes installed Desktop Store entries part of shortcut defaults without a pin-list edit. Explicit installation restores an absent shortcut, retains an existing shortcut in a Desktop subfolder, and stays busy until the filesystem write finishes. Uninstalled shortcuts remain stored but are hidden; ordinary refresh does not undo manual deletion. Mobile-only entries do not acquire invalid Desktop launchers.

Published eight runtime files (0.08 MiB). Live Store checks passed for all 18 current Desktop Store entries, actual Codex Preview/Code OSS catalog installation, artwork decoding, uninstall/reinstall, moved-shortcut retention, deleted-shortcut restoration, private isolation and reload. Seven non-HTML production asset hashes matched. OS app/session/security, staged loading and the existing folder shortcut regression passed locally. These checks do not exercise every engine's gameplay/editor runtime.

The separate folder audit identified non-atomic moves, missing ordinary-file/open-window drops and Drive move reconciliation defects. This follow-up does not remediate those findings.

## CLI input and administrator-only Studio

OS release [e034415](https://github.com/Bl4ut0/PortfoliOS/commit/e034415), build `2026.10.11.10`, deployed and checked at [production](https://os.bl4ut0.dev/?release=e034415). CLI output now scrolls inside its window while the command input remains visible; lazy and reopened windows bind click-to-focus. Portfolio Studio is hidden and direct launch is blocked until the CLI admin command succeeds. Memory-only privileges expire and clear on profile changes.

Validation: project contract, Drive and SecurityKernel checks; staged loading browser checks; CLI/Studio browser regressions locally and on production using simulated admin responses; all nine deployed non-HTML runtime asset hashes matched. Production credentials were not exercised.

## Context menus and desktop shortcut actions

OS release [d41a11a](https://github.com/Bl4ut0/PortfoliOS/commit/d41a11a), build `2026.10.11.11`, deployed and verified at [production](https://os.bl4ut0.dev/?release=d41a11a). Desktop shortcut removal preserves installation and survives refresh/reload. Start menu, Store, taskbar and Explorer app shortcut entries can explicitly create a root Desktop shortcut. Explorer folder background offers local folder/file/upload/refresh actions. One delegated shell menu supports keyboard navigation, profile dismissal and action error feedback; native editing and embedded content menus remain independent.

Validation: project contracts, Drive and SecurityKernel checks; Store shortcut coverage for all 18 Desktop-capable catalog entries; CLI/admin regression; contextual browser checks locally and live including modular/catalog/downloaded installation strategies, failed download, reload/removal, duplicate avoidance, folder copies, Open with keyboard submenus and profile isolation. Downloaded runtime bytes were simulated in disposable profiles, not game-engine verification. All 11 deployed non-HTML runtime asset hashes matched.

## Multi-session theme and backup protection

OS release [b635e9e](https://github.com/Bl4ut0/PortfoliOS/commit/b635e9e), build `2026.10.11.13`, deployed and verified at [production](https://os.bl4ut0.dev/?release=b635e9e). Private preferences save current values under a shared browser lock, carry per-setting revisions/reset markers and reject stale restores. Peer Desktop/Mobile tabs refresh preferences without switching account selection. Backup acquires a profile-specific non-waiting Web Lock and releases it on completion, failure or tab closure. Cross-device distributed locking and document/layout merge conflicts remain unresolved.

Validation: required app/Drive/SecurityKernel contracts and staged-loading browser checks; multi-tab regression locally and on production covering theme propagation, stale restore/reset protection, queued writes, account isolation, delayed-restore profile cancellation, backup contention/failure/tab-close recovery, reload and native Mobile peer preferences. Remote reads were simulated without production Google credentials. All nine deployed non-HTML runtime asset hashes matched. Documentation: [multi-session scope](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/MULTI_SESSION.md).

## Private installation retention

OS release [3baefc2](https://github.com/Bl4ut0/PortfoliOS/commit/3baefc2), build `2026.10.11.14`, deployed and verified at [production](https://os.bl4ut0.dev/?release=3baefc2). Private installation choices persist independently per app with explicit uninstall markers. Installation shortcuts count as customization. Backup no longer acknowledges files created after its snapshot, preserves ambiguous local directories/installed shortcuts, and fails safely when a scanner tries to overwrite a newer SystemFS record.

Validation: required contracts and existing Store/context-menu/multi-session regressions passed locally. Installation retention regression passed locally and against deployed assets: installation during backup, truthful manifest, stale scanner rejection, subsequent upload, recovery from an older incorrect manifest, stale-list restore, concurrent per-app choices, uninstall/reinstall, reload and profile isolation. The test timing correction is [36f00ac](https://github.com/Bl4ut0/PortfoliOS/commit/36f00ac). All 12 deployed non-HTML asset hashes matched. Drive operations were simulated in disposable profiles; no real Google-account or cross-device roundtrip is claimed.

Previously lost shortcuts cannot always be distinguished from deliberate removal; users can restore them through Send to Desktop or reinstall. Desktop grid displacement, ordinary-file drops, atomic moves and full distributed deletion/conflict handling remain separate work.

## One active Google workspace and recovery framework

OS implementation [1b2bcd0](https://github.com/Bl4ut0/PortfoliOS/commit/1b2bcd0), hosting correction [6b402ef](https://github.com/Bl4ut0/PortfoliOS/commit/6b402ef), build `2026.10.11.15`, deployed at [production](https://os.bl4ut0.dev/?release=6b402ef). A verified Google account receives one active Desktop/Mobile lease. A normal takeover waits for supported app saves and successful reconciliation before transferring ownership. Explicit forced takeover retains unreachable local work for later recovery. The destination reconciles before mounting; failed entry cannot bypass that gate on retry.

Drive mutations run under the server account lock with generation checks, including bounded resumable upload chunks. Immutable recovery deltas precede reconciliation. Confirmed content baselines, explicit file deletion journals/tombstones and per-key preferences distinguish independent edits from conflicts. Conflicting copies remain separately recoverable. Native Session recovery lists local copies and recent Drive snapshots and restores through SystemFS Save As. Shared dialog styles load independently of Desktop controllers. Apache bearer forwarding was required by this host and deployed before enabling the frontend gate.

Verification: project contracts, pure merge rules, actual PHP lease state machine, actual binary cURL POST/PATCH/PUT transport and local HTTP coordinator; browser checks for two isolated devices, Desktop/Mobile handoff, failed-entry retries, reload/cloned-tab identifiers, failed-save blocking/retry, forced takeover, immutable offline recovery, native local/cloud restoration, explicit tombstones, missing-storage safety and large-file chunks. Installation retention, same-browser preferences/backup exclusion and staged-loading/context-menu regressions passed. The handoff, installation and multi-session browser checks also passed against production frontend assets with isolated Google/Drive fixtures. All 19 deployed non-HTML frontend hashes matched. Production PHP capability, private-directory creation, bearer forwarding and outbound Google verification were confirmed using an intentionally invalid synthetic credential; no real account was accessed.

Published 3 backend files, 1 Apache configuration and 20 frontend files (approximately 0.43 MiB total). All devices must reload: older running direct-to-Drive clients cannot be fenced retroactively. Google workspaces now require online ownership verification; offline public switching retains local work without claiming a server release. Host storage must remain persistent and privately outside the served site. Independent server replicas, external Drive editors, atomic folder moves/deletions, resumable retry queues, snapshot pruning and engine-native save coverage remain outside this release. A real signed-in Google cross-device roundtrip is still required before claiming that validation. See [the complete contract and limits](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/SESSION_HANDOFF.md).

### Preference merge race follow-up

Final OS release [e950dbd](https://github.com/Bl4ut0/PortfoliOS/commit/e950dbd), build `2026.10.11.16`, deployed and verified at [production](https://os.bl4ut0.dev/?release=e950dbd). A targeted regression reproduced a newer theme remaining visible while its stored preference was overwritten by an in-flight cloud merge. Reconciliation now rejects snapshots already behind live choices and preserves choices changed during upload, including their revision against queued filesystem saves. The regression asserts rendered state, local storage and SystemFS data, not just the visible theme.

The expanded complete handoff/recovery scenario passed locally and on the final production frontend using isolated service fixtures; project contracts passed and all 19 frontend asset hashes matched. Seven follow-up assets (0.05 MiB) were published. Desktop recovery and Mobile takeover dialogs were visually reviewed in disposable profiles. The real Google-account and broader engine/move limitations above remain unchanged.
