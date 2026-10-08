# Serbia Career Gateway — Final PWA Release

Production-oriented static PWA connected to Supabase using the public/publishable browser key.

### Included
- Serbia career proposal/application flow
- Optional candidate email field
- Digital signature and proposal PDF generation
- Candidate dashboard
- Application, payments, documents, process timeline, notifications, receipts and support sections
- Payment request/invoice flow
- Official bank-transfer instructions
- Payment proof upload to private Supabase storage
- `under_review` payment state until staff/admin verification
- Supabase Auth/session integration
- PWA manifest/service worker and install guidance
- Complete SQL reference files plus final company payment account seed

### Payment account
The account holder is shown exactly as supplied: **Kaniz Fatma**. The UI describes it as the designated company/finance receiving account rather than falsely changing the account holder name to the company name.

Run `sql/09_company_payment_account.sql` once in Supabase SQL Editor.
