# Shared core documentation

These documents are the common decision baseline for the PortfoliOS workspace. Read [the root agent instructions](../../AGENTS.md) before changing a project. Shared standards live here; implementation contracts and historical audits stay beside their code.

Reviewed against OS revision [6462961](https://github.com/Bl4ut0/PortfoliOS/tree/64629619c4712faac4aa8043c15658160219ee1a) and browser revision [36acae70](https://github.com/Bl4ut0/PortfoliOS-Browser.JS/tree/36acae7055bdc2bf3032c9944867b004bdc8ea77) on 2026-10-10. Consolidation does not certify every app or turn roadmap items into delivered features.

## Reading map

| Shared standard | Read for |
| --- | --- |
| [Design](DESIGN.md) | Desktop/Mobile experience, themes, interactions, accessibility, status copy |
| [Architecture](ARCHITECTURE.md) | Ownership, boot/login stages, shell separation, deferred services, caching |
| [Applications](APPLICATIONS.md) | Adaptation, lifecycle, engines, host bridges, files, release evidence |
| [Profiles and sync](PROFILES_AND_SYNC.md) | Public/private behavior, Google identity, account transitions, backup boundaries |
| [Decisions](DECISIONS.md) | Accepted cross-project choices, sources and decision updates |

## Guidance promoted from the primary project

| Source in PortfoliOS | Shared guidance moved here | Details retained with the code |
| --- | --- | --- |
| [Architecture](https://github.com/Bl4ut0/PortfoliOS/blob/main/ARCHITECTURE.md) | Ownership and independent experiences | Component map and relationships |
| [Styles](https://github.com/Bl4ut0/PortfoliOS/blob/main/styles/README.md), [appearance audit](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/APPEARANCE_AUDIT.md) | Semantic themes, paired surfaces/text, native phone presentation | CSS files, historical screenshots and audit results |
| [Modular apps](https://github.com/Bl4ut0/PortfoliOS/blob/main/MODULAR_APPS.md), [Mobile](https://github.com/Bl4ut0/PortfoliOS/blob/main/mobile/README.md) | Lifecycle and shared-service consistency | Registration APIs, presets, catalogs and app limits |
| [Staged loading](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/STAGED_LOADING.md) | Boot/login/profile/workspace/app sequence | Loading graph, cache mechanics and checks |
| [OS README](https://github.com/Bl4ut0/PortfoliOS/blob/main/README.md), [mobile parity](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/MOBILE_APP_PARITY.md) | Identity, public reset, profile isolation and safe transitions | Current availability and verification |
| [WASM integration](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/wasm/INTEGRATION.md) | Engine boundaries, selected-file access and release evidence | Candidate inventory, format policy and evaluations |
| [Browser host protocol](https://github.com/Bl4ut0/PortfoliOS-Browser.JS/blob/main/portfolios/INTEGRATION.md) | Scoped messaging and independent source ownership | Message schema and build/import workflow |

Implementation documents remain available so standalone checkouts and published links continue to work. Shared design rationale belongs here; executable contracts belong with their code.

## Interpreting guidance

Current human instructions govern the task. These standards capture agreed product constraints. Repository documentation defines the current APIs and release procedures. If code violates a constraint, report the gap and address it within the authorized task rather than silently redefining the standard.

Audits describe their tested build/environment. Roadmaps describe proposed work. Neither proves current behavior without checking implementation.

Use canonical Git URLs across repositories, exact revisions for provenance and historical evidence, and relative links within this repository.
