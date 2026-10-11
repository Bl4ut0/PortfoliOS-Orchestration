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
