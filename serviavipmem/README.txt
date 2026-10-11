SERBIA GATEWAY — PWA PROJECT
============================

FILES
- Serbia-Gateway-Ready-to-View.html  Standalone preview; double-click to open in a browser (PWA install/offline service worker require localhost/HTTPS)
- index.html             Main Serbia Gateway proposal hub
- manifest.webmanifest   PWA app name, colors, display and icons
- service-worker.js      Offline app-shell caching and static-asset cache
- icons/icon-192.png     Install icon
- icons/icon-512.png     Large install icon
- signature.jpg          REPLACE THIS PLACEHOLDER with your authorized company signature image
- seal.jpg               REPLACE THIS PLACEHOLDER with your official company seal image

RUN LOCALLY
A Progressive Web App service worker will NOT run from a file:// URL. Serve the folder through localhost:

Option A — Python (if installed):
  1. Open a terminal in this folder.
  2. Run: python -m http.server 8080
  3. Visit: http://localhost:8080

Option B — Node.js:
  1. Open a terminal in this folder.
  2. Run: npx serve .
  3. Open the local URL printed by the command.

INSTALL / PUBLISH
- For real phones and public deployment, host the project on HTTPS.
- Open the HTTPS URL in a supported browser. Use the browser's Install app / Add to Home Screen option.
- The service worker caches the main HTML, manifest, icons, signature and seal after first successful load. Offline use is best-effort and depends on the browser's storage policy.

REPLACE COMPANY IMAGES
1. Prepare the company signature image and official seal image.
2. Replace signature.jpg and seal.jpg in this folder, keeping the exact filenames.
3. Refresh the page. If an old image remains after deployment, clear the site's cache or bump CACHE_VERSION in service-worker.js.
4. Use only images you are authorized to use. The supplied JPEGs are clearly marked placeholders, not real signatures or seals.

LAZY LOADING
- Non-critical images added to the page use browser-native loading="lazy" and decoding="async".
- Company signature and seal images are loaded eagerly to reduce the risk of missing images in print/PDF output.
- The service worker caches static assets after successful requests for subsequent visits.

IMPORTANT LIMITATIONS
- This is a front-end PWA shell. Login, live visa status, callback delivery, and chatbot replies are demo/front-end features until connected to a secure backend.
- Do not use the demo login as real authentication. Never put passwords, API secrets, or service credentials in index.html.
- PDF generation uses the browser print dialog (Save as PDF).
- A PWA cannot be installed directly from a local file. Use localhost or HTTPS.


Configured Apps Script Web App URL:
https://script.google.com/macros/s/AKfycbwkws4ipi2Hccy73EhazIr5JZJ8mFJY3-X7SgM3cLKh1s8dz6xiQah0Bv0kXi82ukVeJA/exec
