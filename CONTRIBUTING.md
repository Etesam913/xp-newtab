# Contributing to XP Newtab

Use Node.js 24 (see `.nvmrc`) and npm. Install the locked dependencies with `npm ci`, then run `npm run dev`. Vite serves the app at http://127.0.0.1:3000.

## Checks

- `npm run typecheck`: strict TypeScript checks, including unused code.
- `npm test`: Vitest unit tests for saved data, URL handling, extension rules, and component mutations.
- `npm run build`: type-check and build the extension into `build/`.
- `npx playwright install chromium firefox`: install the test browsers once.
- `npm run test:e2e`: run independent Chromium and Firefox desktop regressions. Build first; the Chromium extension test loads `build/` into an isolated temporary profile.
- `LIVE_YOUTUBE=1 npm run test:e2e -- --project=chromium --grep 'live extension'`: opt-in verification of the actual YouTube embed request and referrer. Regular CI does not depend on YouTube availability.
- `npm run format` and `npm run format:check`: format or check source and documentation.

CI installs with `npm ci`, checks formatting, runs unit tests, builds, and tests both browsers on Linux. Browser failures retain traces in `test-results/`.

## Extension development

For Chromium, enable Developer mode in the extensions page and load the `build/` directory as an unpacked extension. For Firefox, open `about:debugging`, choose **This Firefox → Load Temporary Add-on**, and select `build/manifest.json`. Reload the extension after rebuilding. The Vite development server is for ordinary web testing; load the packaged extension to exercise extension APIs and its content security policy.

The manifest grants access only to `https://www.youtube.com/*` for the YouTube referrer rule. The rule matches YouTube embed subframes initiated by this extension. It is installed before rendering the app and has no effect on ordinary websites. Do not replace it with a global header rewrite or strip other sites' frame restrictions.

To validate and package without adding release tooling to the application dependency tree:

```sh
npx --yes web-ext@10.6.0 lint --source-dir build
npx --yes web-ext@10.6.0 build --source-dir build --artifacts-dir /tmp/xp-newtab-artifacts
```

Keep the existing `windowData`, `iconData`, and `settingsData` localStorage keys compatible. Validate and migrate persisted data in `src/functions/storage.ts`. Use functional updates when changing a window or component so unrelated edits remain intact. Built-in assets live in `public/assets/`; custom image and destination URLs remain user-controlled.
