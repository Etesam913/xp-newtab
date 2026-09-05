<h1 align="center">✏️ XP-Newtab </h1>
<h2 align="center">An extension that customizes your new-tab page in the style of Windows XP.</h2>

https://github.com/Etesam913/xp-newtab/assets/55665282/82186bc0-a41b-480b-9635-264d1260995f

<h3>🔗 Links</h3>
<ul>
    <li>Firefox: https://addons.mozilla.org/en-US/firefox/addon/xp-newtab/</li>
    <li>Chrome: https://chrome.google.com/webstore/detail/xp-newtab/ncfmlogaelpnniflgipmnnglhfiifkke</li>
</ul>

<h3>✨ Features</h3>
<ul>
    <li>Create draggable icons that redirect to websites when double clicked</li>
    <li>Create draggable windows that can hold a plethora of components</li>
    <li>Add search bars, images, videos, and text to windows.</li>
    <li>Instantaneous saves</li>
</ul>

## Development

Built with TypeScript, React 19, Vite 8, Zustand 5, Lexical, styled-components 6, and XP.css / 98.css / 7.css. Built-in wallpapers, cursors, icons, fonts, and themes are bundled for offline use.

```sh
npm ci
npm run dev
```

Requires Node.js 22.12 or newer; Node.js 24 is the development and CI version. Open http://127.0.0.1:3000. `npm run build` produces the browser extension in `build/`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for testing and loading the extension, and [AUDIT.md](AUDIT.md) for the modernization findings and verification results.

## Chrome Web Store release checklist

The extension build is ready for Chrome Web Store packaging. The Chrome extension version comes from `public/manifest.json` (`1.2.4` at the time of writing); increase it above the version currently published before uploading an update. The `package.json` version is separate, but keeping both versions aligned avoids release confusion.

Run the release checks from the repository root:

```sh
npm ci
npm run format:check
npm test
npm run build
LIVE_YOUTUBE=1 npm run test:e2e -- --project=chromium
npx --yes web-ext@10.6.0 lint --source-dir build
```

Create a ZIP with `manifest.json` at the archive root. Do not ZIP the parent directory:

```sh
cd build
zip -r ../xp-newtab-<version>.zip .
cd ..
```

Before uploading, load `build/` through `chrome://extensions` with Developer mode enabled and verify the new-tab page, saved data, YouTube iframe, icons, and browser console. The generated `build/` directory is ignored by Git and is the upload artifact.

The existing Chrome listing is linked above and has extension ID `ncfmlogaelpnniflgipmnnglhfiifkke`. Use that listing if the original publisher account is still available; uploading as a new item creates a different extension ID.

The Chrome Developer Dashboard also requires store content: a detailed description, category and language, a 128×128 icon, at least one 1280×800 or 640×400 screenshot, a 440×280 promotional tile, and support or homepage URLs where available. Complete the Privacy tab with a single-purpose statement, permission justifications, and an accurate privacy policy. Disclose local saved data and any user-configured image, search, destination, or YouTube requests. The manifest currently requests `unlimitedStorage`, `declarativeNetRequestWithHostAccess`, and `https://www.youtube.com/*`.

Register for the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/) if needed; registration requires the developer agreement and a one-time fee. See Google's [preparation guide](https://developer.chrome.com/docs/webstore/prepare), [listing requirements](https://developer.chrome.com/docs/webstore/cws-dashboard-listing), and [privacy guidance](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy) before submitting for review. The current CI workflow builds and tests the extension but does not upload it to the store.

<b>I am not affiliated, associated, authorized, endorsed by, or in any way officially connected with Microsoft, or any of its subsidiaries or its affiliates.</b>
