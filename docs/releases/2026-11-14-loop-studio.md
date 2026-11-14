# Loop Studio and shared sound library release

Release **2026.11.14.2**, published and checked at [os.bl4ut0.dev](https://os.bl4ut0.dev/?release=2026.11.14.2).

- OS source: [b08cb790](https://github.com/Bl4ut0/PortfoliOS/tree/b08cb790f4954b9b699cd3dd00539d881b30cafb).
- Shared integration standards/check configuration: [cc09547](https://github.com/Bl4ut0/PortfoliOS-Orchestration/commit/cc09547).
- Production verification: 2026-11-14T08:06:03.860Z.
- Selected upload: 37 files, approximately 1.17 MiB; assets before the service worker and HTML entry point. All 37 deployed file hashes matched the local release bytes.

## Delivered behavior

Install **Loop Studio** from Desktop Store → Media. The native app compiles a bounded Strudel expression language into real patterns, with live updates, synth voices, shared sounds, OS volume/mute, local output recording and common SystemFS project/recording dialogs. It honors Save/Discard/Cancel and profile handoff. Incomplete patterns can be saved as inert text; playback and proposed model drafts require valid bounded expressions.

The public [sound index](https://os.bl4ut0.dev/data/sounds/catalog.json) starts with eight original ISC-licensed sounds: kick, snare, closed/open hats, clap, rim, low tom and bell. Audio totals **88,328 bytes**. The reusable OS sound service can supply these as fallback samples without overriding an app's own bank. It never indexes private SystemFS files.

[Sound-pack publishing instructions](https://github.com/Bl4ut0/PortfoliOS/blob/b08cb790f4954b9b699cd3dd00539d881b30cafb/data/sounds/README.md) cover stable IDs, actual license/source metadata, validation/indexing, selected deployment and the shelf's Refresh action. Failed indexing preserves the prior usable catalog. Adding sounds does not add audio downloads to boot/login.

The unmodified `@strudel/web` 1.3.0 engine is restored from a SHA-512-pinned npm archive. The receipt records SHA-256 hashes for the runtime and accompanying source/notice files; Git attributes preserve their bytes. Engine download is deferred until Play, and sound files load when used. The boot precache remains 11 assets. Used code/sounds can replay offline when browser caches remain available.

Co-compose uses the existing Local AI service, with local-only checks at request entry and provider dispatch. Drafts require human Apply and Play. Five scoped MCP tools support sound listing, editor reading, validation, draft proposals and stopping playback over a browser-local MessagePort.

## Validation

- OS `npm test`: app/lifecycle/loading contracts (43 Desktop apps, 25 Mobile apps, 198 first-party scripts), security, merge, cloud-driver, runtime, encrypted-vault, networking-policy and music checks completed. The legacy Google session command exits without its final success marker; its zero exit is not proof of an authenticated provider flow.
- Orchestration `npm test`: 19 tests passed.
- Music unit checks: pinned artifact/sample hashes, bounded patterns, JavaScript rejection, catalog paths, reviewed proposals, MCP initialize/list/call and revocation.
- Real local browser: actual Strudel/Web Audio signal and MediaRecorder output, live sample updates, mute, native saves/cancel/discard, unfinished-draft autosave on public handoff, private reload and account isolation, replay/minimize cleanup, light/narrow Desktop, local-only AI plumbing fixtures and offline replay after loading.
- Staged-loading browser check: separate experience shells, profile gate, deferred AI/media, retry and atomic boot cache, offline app reload.
- Pack authoring check: actual WAV metadata and preserving the prior catalog after a rejected traversal path.
- Production public browser: selector → login → workspace, Store install, eight sounds, deferred engine/AI, actual output signal, mute, SystemFS project save, close, public reset and no frontend errors. No real private account or provider credentials were used.

Native Mobile adaptation, physical-device latency/codec certification, full Strudel language/effect coverage, real local-model composition quality and an external HTTP/stdio MCP transport remain follow-up work. The local MCP port is not an externally reachable server. This release does not change native CLI/provider authentication completion status.

## Verified production bytes

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| `core/sound-library.js` | 3143 | `daeb73c1a07f8693bae53aa26d71b268773a8fb0b76265eb7a94e4f6b9ef2e41` |
| `core/local-ai.js` | 89212 | `fe25dc372384bdd958ca667b339fca1e5b7eddfe8cfa47b9efd0182dc33dfcc9` |
| `core/preferences.js` | 48699 | `73f22037bc4ce82db025aaf7183559e2a3ac824811d5c939b0ca278d56e104e4` |
| `core/loading-manifest.js` | 4433 | `0b8e192143d5ca2368e5fcade8b92e47b85b50646f4921db441d764d3142c782` |
| `core/app-loader.js` | 3764 | `0f48500cb14e5972922d5c088a664f2e2b38a342bfabf463dc8127e9ae19bf9a` |
| `mobile/app-loader.js` | 2492 | `78e18c8fce33184f1aad0bac553296221364b7f1767970ef6e5cbffbc9a80898` |
| `data/apps.js` | 24932 | `48ea2a49a099901466142bf756489b60564802a0b1b832a1e89f45c73f93c34b` |
| `desktop/store.js` | 35706 | `b7370e6a4ed83b6dc9dbd1c28b79a15d7a9a250cb1a0c6c0e3321756372208d0` |
| `apps/files/app.js` | 89371 | `9df50bb7bccb4fb3606e7b4e27a7e4974bad454f5da17900a492ab628c19cf91` |
| `index.html` | 17828 | `9280d4b7dbc4b8ac30b9ce793543be0df9dd6b4671f2a6f95eb7859bcc126c73` |
| `sw.js` | 17162 | `78b16887409af94f35fd80602d4b0b5b669b38cbcc605d94577bc7f30301d5f3` |
| `apps/loop-studio/app.css` | 8800 | `e4be6297f98d502604c589965eb0ff3da596e609dbcd694556f1e38e3f04ae90` |
| `apps/loop-studio/app.js` | 23669 | `6e490de28878ca983ce07922c386e29b230e31291bffd4133cad1b01a9092297` |
| `apps/loop-studio/audio.js` | 6737 | `cfe1d732f68e7a2eabefe4543994158d5eb81abee99badbf9c86fefbc81982b5` |
| `apps/loop-studio/engine.json` | 960 | `d93e08d583cc8261aedc1e9c03319efd2781741bf00100b1d7feb576aec8f94f` |
| `apps/loop-studio/icon.svg` | 594 | `5ee5027a1bd5793aeaaba905b39f43e4ffccf9bf7153e777a8b929ae3d4df57d` |
| `apps/loop-studio/LICENSE` | 34523 | `0d96a4ff68ad6d4b6f1f30f713b18d5184912ba8dd389f86aa7710db079abcb0` |
| `apps/loop-studio/patterns.js` | 11727 | `da225d346c6f6dac83b7005d8536b6a0dec267111cd01bb6502456f2bf4b7dad` |
| `apps/loop-studio/README.md` | 6729 | `c8180c46fbe5f35f77faf12884b6b0addb3cc6ed9ebebcc896e98155b15ab024` |
| `apps/loop-studio/tools.js` | 6468 | `50054a6d25457198b625213492ba4896000504c24d3220558d69f8b5be38b250` |
| `apps/loop-studio/vendor/LICENSE-Strudel.txt` | 34523 | `0d96a4ff68ad6d4b6f1f30f713b18d5184912ba8dd389f86aa7710db079abcb0` |
| `apps/loop-studio/vendor/strudel-web-1.3.0.js` | 655936 | `265cae9cf769a7dc2c1ac253784fce80fef5062db9a1aac5be7fa5f205af5e86` |
| `apps/loop-studio/vendor/upstream-package.json` | 1083 | `7af9d3a5a664cf64f075c761d59eb7aa2c04ebee16211459d95f8895d6dc2919` |
| `apps/loop-studio/vendor/upstream-vite.config.js` | 813 | `544f19ffcacb8ffce74e4f1a7ac7cab60014f0cd62de7db2a8fe6273baeecef2` |
| `apps/loop-studio/vendor/upstream-web.mjs` | 1926 | `f29e1e2c0182ae1fe855b8663aabab0ed011b3bb8fd304e600aa7a61a1fc88ef` |
| `data/sounds/catalog.json` | 3485 | `4316153635a61149f6e82e05d13f65d486ba9969e3d031e9138e51beb54cf54b` |
| `data/sounds/portfolios-kit/bd.wav` | 15920 | `00e2e5ef06e4edaea97ae6bad465a73e8690ea9491aaab518e8058f70c0b6054` |
| `data/sounds/portfolios-kit/bell.wav` | 22094 | `61e8abd297fe161f6c66e2961e46f309aa75a05d44a0332b57d59f3a56788e73` |
| `data/sounds/portfolios-kit/clap.wav` | 9746 | `ae95c20adab63520e09ce6ef19d6964d4ffbc663a2a17251935f08046841c00a` |
| `data/sounds/portfolios-kit/hh.wav` | 2910 | `4c72c6ef5e07e77734aba68e83da7500c6c426467c705e792bacdcc4ded4f334` |
| `data/sounds/portfolios-kit/LICENSE.txt` | 760 | `af19952e8977e558d210732e344248b6dd97ca428d89f04efe1825b16f824bd9` |
| `data/sounds/portfolios-kit/oh.wav` | 10186 | `8ecb9f094a8e0e3d8bedb22b2aee59d33775234cc9ea642cc5e5222efa8e8e9a` |
| `data/sounds/portfolios-kit/pack.json` | 1334 | `b66282cb399fa8ae598e654712b6e5de5f5f00cba74ab78d7feab14e3a044f65` |
| `data/sounds/portfolios-kit/rim.wav` | 4012 | `6001eaf7be730cdc2f75796f6c117d7c8944f186da38125083cdd9983fe9db7b` |
| `data/sounds/portfolios-kit/sd.wav` | 8422 | `4dce7f7d17c415c30a42a416c3904293d5391f132feaf8b726fa1908d0e7a2c3` |
| `data/sounds/portfolios-kit/tom.wav` | 15038 | `2258614c0e436e15d279060a34acf80bd325e8fbb4dff25e159c8e9676688661` |
| `data/sounds/README.md` | 3965 | `8489bbd44fea3ea4a5302393f489e728d9a8ce921770f1ced4615af302a731c9` |

## Rollback

Prior OS release source: [e6b5978e](https://github.com/Bl4ut0/PortfoliOS/tree/e6b5978ec48500d58733253c14bfd4cc87b935f5). Restore/redeploy the prior changed browser assets with a fresh release/cache version using the normal selected-upload workflow, with assets before HTML. The uploader does not delete unused remote files. Preserve profile projects and sound IDs; rollback must not erase private files or imply that old client caches were purged.
