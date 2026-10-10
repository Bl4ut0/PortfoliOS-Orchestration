# PortfoliOS shared agent instructions

This repository is the shared documentation and orchestration root for PortfoliOS and its independent application repositories. These rules apply across this workspace. Current human instructions take precedence; these documents do not create additional approval requirements.

## Read before making decisions

Read [the core index](docs/core/README.md), then the standards relevant to the task:

- [Design and experience consistency](docs/core/DESIGN.md)
- [Architecture and staged loading](docs/core/ARCHITECTURE.md)
- [Application and runtime integration](docs/core/APPLICATIONS.md)
- [Profiles, files and Drive backup](docs/core/PROFILES_AND_SYNC.md)
- [Decision record](docs/core/DECISIONS.md)
- [Build and deployment coordination](docs/BUILD_AND_DEPLOY.md)

Also read the target repository's agent instructions and technical contract. Shared standards govern product decisions; repository documents specify executable APIs, builds and release commands. Historical audits provide dated evidence rather than new standing requirements.

## Working across repositories

- Identify a checkout by its Git remote, not its folder name or npm package name.
- Keep source changes in the owning repository. This root tracks shared documentation, decisions, workspace configuration, build/deployment coordination and orchestration metadata.
- Child checkouts are ignored directories, not submodules or vendored source. Never stage them or copy their Git metadata into this repository.
- Preserve unrelated work and stage only task-owned files in each repository.
- Keep shared OS accounts, storage, backup and media services in PortfoliOS. Keep independently maintained application engines in their own repositories and import checked release artifacts.
- Record shared design or architecture decisions here. Keep implementation instructions and task status with their owning repository.
- Organization creation, repository transfers and visibility changes require a specific user request; ordinary project work does not imply them.

## Documentation and evidence

Use full Git repository URLs across repositories and relative links within a repository. Use exact commit/tag URLs for release provenance. Do not use contributor drive letters, user-home paths, absolute checkout locations or file URLs as documentation references.

Separate implemented behavior, proposals and historical measurements. Verify claims against current code before promoting them into shared rules. Correct stale guidance instead of creating competing copies.

Run checks appropriate to the actual change. Documentation needs link/reference review; runtime changes need the relevant lifecycle, appearance, loading, account or integration checks. Follow the owning repository's authorized publication and release process. A shared-documentation change does not require an application runtime deployment.

Report affected repositories, checks, published commits and material limitations. Never commit credentials, access tokens, private user data, environment files or ignored runtime/build caches.
