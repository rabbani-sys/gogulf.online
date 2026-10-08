# Serbia Career Gateway — Final Deployment Checklist

## Frozen release
This release freezes the Serbia Career Gateway PWA payment account supplied by the business owner:
- Bank: SBI (State Bank of India)
- Account holder: Kaniz Fatma
- Account number: 44624622176
- IFSC: SBIN0005602
- Branch: Picnic Garden
- UPI: Not applicable

The account holder is displayed as the actual bank account holder. The interface identifies it as the designated company/finance receiving account; it does not rename the bank account holder to the company name.

## Supabase
1. Keep the completed 8 database batches already applied. Do not rerun old migration files from earlier drafts.
2. Run `sql/09_company_payment_account.sql` once in Supabase SQL Editor.
3. Confirm the account appears in `company_payment_accounts` and is active.
4. Create/login your first Supabase Auth user and bootstrap that user as `super_admin` using the controlled SQL previously supplied.
5. Never place a service-role key or database password in this project.

## GitHub
Upload/replace the complete contents of this ZIP in the repository root. The project is static and can be deployed directly from GitHub/Vercel/another HTTPS host.

## PWA
- `manifest.webmanifest` and `sw.js` are included.
- HTTPS is required for production PWA installation.
- Android/desktop: use the Install App button when the browser exposes the install prompt.
- iPhone/iPad: Safari → Share → Add to Home Screen.

## Payment safety
Candidate upload of a screenshot/receipt creates a payment submission with `under_review`. It does not verify the payment. Authorized staff/admin must verify it before the workflow advances.
