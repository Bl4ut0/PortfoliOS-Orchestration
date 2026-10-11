# Application reliability release

Site build: 2026.10.10.7. Deployment and production verification completed 2026-10-11.

## Source

- [OS release](https://github.com/Bl4ut0/PortfoliOS/commit/9174643): remove retired hosted PDF/Tools Hub entries, add Browser to the default desktop, correct Browser partition ownership, repair game isolation/installation and Quake local data loading, label Office Preview accurately, and expand application checks.
- [Browser source](https://github.com/Bl4ut0/PortfoliOS-Browser.JS/commit/79c220719c55ba51adc7a8269c1daa0077f058ec): deduplicate concurrent controller startup, register readiness before navigation, bound isolation initialization and recover through native Proxy settings/Retry website. The clean build receipt and eight imported artifact checksums match this revision.
- [OpenRCT2 origin rule](https://github.com/Bl4ut0/PortfoliOS/commit/e9d371c) and [origin CDN configuration](https://github.com/Bl4ut0/PortfoliOS/commit/1ebe222) were published separately. Warmed CDN responses still bypass the hotlink rule; this is not an authentication boundary.

The [OS application audit](https://github.com/Bl4ut0/PortfoliOS/blob/aa3f757/docs/APPLICATION_AUDIT_2026-10-10.md) records reproducible checks and scope limits.

## Validation

- OS contracts: 24 Desktop/24 Mobile modules, viewport/Home, Drive session simulations, local security policy, installed byte ranges and legacy Duke HTML upgrade passed. PHP entrypoint syntax checks passed.
- Nine orchestration tests and 24 optional Runtime tests passed. Runtime remains a local laboratory, not a production Codex engine.
- Staged loading/offline caches passed. Core private SystemFS/browser workflows, Mobile Store/touch NES diagnostic and Browser provider/native fork checks passed. Tests use disposable local profiles and controlled provider fixtures.
- Appearance: 559 rendered scenarios and 12,743 text checks, zero detected contrast failures, including Quake setup across seven themes.
- Quake: real Store engine installation, missing-data setup, malformed/truncated PAK rejection, local PAK import, actual WebGL engine frames, cached ranges and private reload passed. Test game data remained local and was not published.
- OpenRCT2: production Store installation downloaded four files/75,692,538 bytes, matched source SHA-256 and no-backup runtime metadata, and survived private reload. This check does not run the game or download its RCT archive.

## Production verification

Uploaded 44 application/runtime files (7.46 MiB), followed by the updated OpenRCT2 runtime README. Assets preceded embedded HTML, service worker and OS entrypoint. No test profiles, game-data fixture or credentials were published.

- All 29 selected source/artifact hashes matched production. All 347 static manifest paths were reachable; all 79 reported lengths matched.
- All four new PHP game/storage entries emitted HTTP 200 and COEP require-corp.
- Quake's complete Store/local-import/WebGL/reload workflow passed on production. Native Desktop/Mobile private-save, preferences, installed-app persistence, A/B isolation, public reset and Preview-gate checks passed.
- Six desktop game entry points were observed without JavaScript exceptions. DOOM reported running and Duke created its isolated canvas. Diablo, OpenRCT2 and UT99 were still downloading game data at observation, so completed gameplay is not established. Quake's absent-data setup appeared as expected; its separate local-data test reached real frames.
- Optional workspace HTML prefetch returned 503 while actual shell requests succeeded. A follow-up probe verified successful later responses with no unresolved failure. The [audit follow-up](https://github.com/Bl4ut0/PortfoliOS/commit/aa3f757) records this distinction and the production observations; runtime assets are unchanged.

Production: [Desktop](https://os.bl4ut0.dev/?view=desktop&release=aa3f757) and [Mobile](https://os.bl4ut0.dev/?view=mobile&release=aa3f757).

## Remaining dependencies

The automatic Wisp discovery service rejects the PortfoliOS origin. The maintained browser needs an authorized external Wisp endpoint; Hosted Browser.js remains an explicit connection option, but its live public-site test also did not complete after loading its UI/controller. Relay and content-isolation service availability both need verification. Recovery tests establish controlled failure behavior, not live relay availability.

External account/service checks, physical phones, full game/sound/multiplayer/save coverage, and legacy engine-native storage isolation remain separate validation work. Office Preview is a text/JSON editor, without full LibreOffice or binary office-format compatibility. Codex Preview does not execute Codex or provide browser ChatGPT sign-in.
