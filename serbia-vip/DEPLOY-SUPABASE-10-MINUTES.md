# Serbia Career Gateway — Supabase Deployment

## 1. Run the SQL
Open **Supabase → SQL Editor** and run the files in this exact order:

1. `sql/01_core.sql`
2. `sql/02_applications.sql`
3. `sql/03_payments.sql`
4. `sql/04_documents_storage.sql`
5. `sql/05_tracking.sql`
6. `sql/06_admin.sql`
7. `sql/07_rls.sql`
8. `sql/08_seed_serbia.sql`

There are **8 SQL batches**.

## 2. Configure Auth
In Supabase Auth settings, configure Email/Password according to your desired production policy.

For fastest testing, email confirmation can be disabled temporarily. For production, use your verified email/domain configuration.

## 3. Configure the PWA
Open `index.html` and replace:

```js
supabaseUrl: "https://YOUR_PROJECT.supabase.co",
supabaseAnonKey: "YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY"
```

Use the **publishable/anon key only**. Never put the `service_role` key in browser code.

## 4. Deploy the folder
Deploy the contents of this folder to your HTTPS host/Vercel/static hosting.

Do not open with `file://` if testing PWA installation.

## 5. Candidate flow
Candidate submits the proposal → Supabase stores candidate/application/payment schedule → candidate creates/logs into Auth account → dashboard loads from Supabase → payment proof uploads to private Storage → payment row becomes `under_review` → staff/admin verifies it → receipt/notification is updated.

## 6. Important
The bank details in the UI are still placeholders. Replace them with your verified official company payment details before accepting real payments.

The proposal form email remains optional. A private cross-device dashboard requires an authenticated account; candidates who submit without email can later create an account and claim their application using the reference + mobile number.
