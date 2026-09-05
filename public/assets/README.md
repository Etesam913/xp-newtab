# Bundled app assets

These wallpapers, cursors, and toolbar/control-panel icons are copies of the assets the existing app loaded from:

https://storage.googleapis.com/etesam-public/Windows-XP-Newtab/

Their directory names are preserved so the original asset URL can be reconstructed from its relative path. Bundling them removes the app's startup dependency on that host. Existing custom URLs are not replaced. `image-placeholder.svg` is a local placeholder created for this project, replacing the unavailable placeholder service.

XP.css, 98.css, and 7.css (including their bundled fonts and icons) are installed from npm and retain their respective upstream MIT licenses. Bundling existing Windows imagery does not change its ownership or imply a new license. The project remains unaffiliated with Microsoft.
