# Serbia Career Gateway — 10-Minute Production Deployment

## What is included
- Existing Serbia PWA UI preserved
- Real Google Apps Script API layer
- Google Sheets application records
- Google Drive candidate folders
- Digital signature saved to Drive
- Offline queue in localStorage
- Real `manifest.webmanifest`
- Real `sw.js` service worker
- PWA install prompt
- Stable application reference number
- Activity log

## 10-minute deployment

### A. Google Drive + Sheet
1. Create a Google Sheet.
2. Copy its Spreadsheet ID.
3. Create a Drive folder named `Serbia Career Gateway`.
4. Copy the folder ID.

### B. Apps Script
1. Open the Sheet → Extensions → Apps Script.
2. Replace `Code.gs` with the supplied `Code.gs`.
3. Put the Spreadsheet ID and Drive Folder ID into the two constants.
4. Save.
5. Deploy → New deployment → Web app.
6. Execute as: **Me**.
7. Who has access: **Anyone**.
8. Deploy and copy the `/exec` URL.

### C. Connect the PWA
Open `index.html` and replace:

PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE

with the Apps Script `/exec` URL.

### D. Host
Upload these files to any HTTPS static host:
- index.html
- manifest.webmanifest
- sw.js
- icons/icon-192.png
- icons/icon-512.png

For Vercel/Netlify/GitHub Pages, the root must serve `index.html`.

## Important
The current PDF is generated in the candidate's browser and downloaded locally. This package records the application and signature in Google Drive. Server-side PDF archiving is a separate enhancement because the current HTML-to-PDF library generates the PDF client-side.

## Before taking real applications
Test one complete application using dummy data and verify:
- Sheet row created
- Candidate folder created
- Signature file created
- PDF downloads
- PWA installs
- Mobile signature works
- Offline queue retries after reconnect

Do not collect real passport/identity information until your privacy notice, retention, access controls, consent wording, and operational/legal requirements have been reviewed.
