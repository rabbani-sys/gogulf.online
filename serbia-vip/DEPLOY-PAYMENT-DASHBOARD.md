# Serbia Career Gateway — Candidate Dashboard + Payment Center

## Included
- Candidate dashboard: Overview, Application, Payments, Documents, Process, Notifications, Receipts, Support.
- Automatic payment request popup after dashboard login when a payment stage is due.
- Proposal-based breakup: ₹3,00,000 total; ₹1,50,000 during processing in three ₹50,000 stages; ₹1,50,000 deferred after joining.
- Payment methods: UPI, Bank Transfer, NEFT/RTGS, Cash/Office.
- Bank-details popup with account holder, bank, account number, IFSC, branch, account type, UPI and SWIFT fields.
- UTR/transaction ID + date + payer source + screenshot/PDF upload.
- Receipt number and dashboard receipt after proof submission.
- Local dashboard persistence plus Google Apps Script sync when `apiUrl` is configured.

## IMPORTANT BEFORE GO-LIVE
1. Replace the placeholder bank details in `PAYMENT_CONFIG.bank` inside `index.html` with the company's verified official bank/UPI details.
2. Replace `PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` in `index.html` with the deployed Apps Script Web App URL.
3. In `Code.gs`, replace `PASTE_GOOGLE_SHEET_ID_HERE` and `PASTE_GOOGLE_DRIVE_FOLDER_ID_HERE`.
4. Deploy Apps Script as Web App: Execute as Me; access Anyone.
5. Do not treat a submitted receipt as confirmed payment. The dashboard intentionally marks it **Under Review** until staff verifies the transaction.
6. Configure real authentication/authorization (preferably Supabase Auth) before using real candidate financial data. The current HTML login is a portal workflow shell, not a secure authentication system.
