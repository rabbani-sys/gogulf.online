SERBIA GATEWAY — PWA INSTALLATION

This folder contains a Progressive Web App with a web manifest, 192px/512px app icons, a globe favicon, install button, service worker, and offline app-shell caching.

IMPORTANT: PWA installation and service-worker offline support require HTTPS or localhost/127.0.0.1. Opening index.html directly using file:// allows a preview but does not enable installation or service-worker caching.

LOCAL TEST (Windows):
1. Install Node.js if needed.
2. Open PowerShell in this folder.
3. Run: npx serve .
4. Open the localhost URL printed by the command.
5. In Chrome/Edge, use the in-page Install App button or the browser's install icon/menu.

DEPLOYMENT: Upload the complete folder to an HTTPS static host. Keep index.html, manifest.webmanifest, service-worker.js, favicon files, icons/, signature.jpg and seal.jpg in the same relative structure.

OFFLINE: The page shell, manifest, icons, seal and signature are cached after the first successful online visit. Email submission still requires internet access.

BROWSER NOTES: The custom install button appears when the browser supports beforeinstallprompt. On iOS, use Safari Share > Add to Home Screen. Browser support and install UI vary by platform.
