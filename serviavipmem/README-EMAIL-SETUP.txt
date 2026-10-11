SERBIA GATEWAY — EMAIL-READY PWA PROJECT
========================================

INCLUDED
- index.html: PWA entry page, updated to create a PDF in the browser and submit it to Google Apps Script when configured.
- Serbia-Gateway-Ready-to-View.html: standalone HTML test version (can be opened directly in a browser).
- google-apps-script/Code.gs: server-side Gmail endpoint. Fixed recipient: mgs.rabbani@gmail.com. Does not write candidate documents to Google Sheets.
- manifest.webmanifest, service-worker.js, icons/, signature.jpg, seal.jpg: PWA shell and company-image placeholders.

IMPORTANT STATUS
The HTML can generate and download the signed PDF when online and the PDF libraries load. Automatic email is NOT active until you deploy Code.gs as a Google Apps Script Web App and paste the deployed /exec URL into CONFIG.scriptUrl in the HTML. This project cannot deploy into your Google account on your behalf.

SET UP GMAIL DELIVERY
1. Visit https://script.google.com/ and create a new project.
2. Open google-apps-script/Code.gs from this project and copy all of its contents into the Apps Script editor, replacing the default code.
3. Save the project.
4. Choose Deploy > New deployment > Select type > Web app.
5. Set “Execute as” to your account. Set access to the broadest access option suitable for your candidate audience (typically “Anyone” for public applicants). Review the security warning and only proceed if you accept the risk of a public endpoint.
6. Deploy and authorize MailApp when prompted. Copy the deployed Web App URL ending in /exec.
7. In BOTH index.html and Serbia-Gateway-Ready-to-View.html, find the CONFIG line near the top of the main script and replace scriptUrl:"" with scriptUrl:"YOUR_DEPLOYED_WEB_APP_URL".
8. Save both files. Test using a sample candidate, then verify the email and PDF attachment in mgs.rabbani@gmail.com. Also review Apps Script > Executions for errors.

TEST HTML LOCALLY
- Double-click Serbia-Gateway-Ready-to-View.html while online. Complete the candidate form, acknowledge terms, type the same name, draw the signature, and click Generate Official Proposal.
- The PDF should download. With CONFIG.scriptUrl empty, the page clearly says email is not connected.
- For PWA install/offline testing, run a local server from this folder:
  python -m http.server 8080
  Then open http://localhost:8080

PDF / INTERNET REQUIREMENTS
The HTML uses html2canvas and jsPDF from public CDNs to build a real PDF blob from the proposal page. Internet access is required for these libraries unless you self-host them. The PDF is downloaded locally before the email submission is attempted. Email attachment limit in this implementation: 7 MB.

PRIVACY AND SECURITY
- This script emails to a fixed recipient; it does not accept a recipient from the browser and does not use Google Sheets.
- A publicly accessible Apps Script URL can be abused by third parties. The included checks are basic input validation, not strong authentication or bot protection. For public production use, place a proper authenticated/rate-limited backend in front of MailApp or add verified anti-abuse controls. Do not treat the demo as a high-assurance signing platform.
- The browser's no-cors request cannot read the Apps Script response, so the page cannot confirm delivery. Check Gmail and Apps Script Executions.
- Demo login, visa tracking, callback form and chatbot remain front-end demo features.
- Replace signature.jpg and seal.jpg with authorized images before production.
- Review legal terms, recruitment/immigration compliance, privacy notice and consent wording before real candidate use.


Configured Apps Script Web App URL:
https://script.google.com/macros/s/AKfycbwkws4ipi2Hccy73EhazIr5JZJ8mFJY3-X7SgM3cLKh1s8dz6xiQah0Bv0kXi82ukVeJA/exec
