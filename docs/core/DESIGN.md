# Design and experience consistency

PortfoliOS should feel like a usable virtual computer. Desktop, Mobile, Quick and CLI are distinct ways to use the same portfolio and workspace services.

## Entry and sign-in

- Preserve the typed introduction and Desktop/Mobile/Quick selector on reload. For reduced motion, show the completed introduction immediately.
- Show the selected experience's account selector before mounting its workspace. Do not flash Desktop, the wrong profile or default preferences behind sign-in.
- Offer the Bl4ut0 public profile, remembered private profiles and another Google account. Share the profile registry across Desktop and Mobile.
- Present Desktop sign-in as a desktop session screen and Mobile sign-in as a phone user selector using its own theme and viewport.
- Keep identity consistent across sign-in, Settings, launchers and assistants. Reserve avatar space and show a useful fallback if an image fails.
- Quick remains a direct public portfolio route without requiring Google.

## Desktop, Mobile and applications

Desktop uses windows, a launcher, taskbar, shared window controls, adaptive geometry and predictable focus. Mobile uses native phone screens, Home/Back/Recents, touch controls, a shade and safe-area-aware layouts. Share neutral services rather than embedding Desktop's framework in Mobile.

Physical phones and installed Mobile PWAs fill the live viewport. Desktop phone previews can retain a device frame. Rotation, virtual keyboards and resized viewports must not discard the active task.

Keep Mobile Store discoverable. Adapt useful core tools where practical; show accurate availability for games/engines still needing touch or resource work. A scaled Desktop canvas does not establish mobile support.

Menus, dialogs and connection options need an accessible dismissal path. Closing browser options should preserve tabs; changing the provider is explicit.

## Themes and components

Use semantic tokens from the active experience for first-party chrome. Change surfaces and foregrounds together; avoid global text changes over fixed backgrounds.

| Purpose | Existing OS token examples |
| --- | --- |
| Surfaces | `--surface`, `--surface-raised`, `--surface-inset`, `--surface-overlay` |
| Text hierarchy | `--text`, `--text-soft`, `--text-muted` |
| Readable accent text | `--theme-primary-ink`, `--theme-accent-ink` |
| Text on filled buttons | `--on-primary`, `--on-accent` |
| Borders and hover | `--line`, `--line-strong`, `--control-hover` |

Mobile resolves semantic colors in its own palette. Desktop and Mobile appearance settings stay independent and profile-scoped. Independent app repositories can keep their theme implementation while preserving readable host integration and native phone presentation.

Keep intentional artwork, media, document paper, game canvases and third-party skins independent. Theme their host controls. Wallpaper labels need contrast against the wallpaper itself.

Use the established `>_` PortfoliOS mark: white chevron and cyan (`#22d3ee`) cursor on a dark tile, consistent with boot and the favicon. Use it for OS branding; public-profile portraits and upstream application logos remain distinct.

Reuse established typography, radii, icons and components. Translucency/blur must preserve readability and responsiveness; opaque semantic surfaces suit text-heavy controls.

## Interaction and evidence

Support keyboard navigation, visible focus, readable names, touch, zoom and reduced motion. Check affected palettes, placeholders, errors, loading states and custom accents. Use the project's 4.5:1 normal-text and 3:1 large-text contrast thresholds as regression targets, with manual review for imagery and transparency.

Show real account, backup, installation and service states. Do not invent CPU measurements, successful uploads, live uptime or completed features. Keep implementation detail out of ordinary user flows unless it helps a decision.

Use relevant rendered appearance checks. A historical audit or Desktop screenshot does not certify a new app, a phone GPU or every accessibility requirement.

## Sources and implementation

- [Styling map](https://github.com/Bl4ut0/PortfoliOS/blob/main/styles/README.md) and [semantic tokens](https://github.com/Bl4ut0/PortfoliOS/blob/main/styles/tokens.css)
- [Appearance audit and limitations](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/APPEARANCE_AUDIT.md)
- [Mobile presentation](https://github.com/Bl4ut0/PortfoliOS/blob/main/mobile/README.md) and [adaptation map](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/MOBILE_APP_PARITY.md)
- [Staged entry implementation](https://github.com/Bl4ut0/PortfoliOS/blob/main/docs/STAGED_LOADING.md)
