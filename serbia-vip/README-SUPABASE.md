# Serbia Career Gateway — Supabase Migration

## SQL batches
Run these **8 batches in order** in Supabase SQL Editor:

1. Core identity / profiles / candidates
2. Applications / proposals
3. Payments / payment requests / receipts
4. Documents / Storage bucket
5. Process timeline / notifications / support
6. Staff / admin / audit log
7. RLS / Storage security policies
8. Serbia payment schedule + application creation RPC

Do not run them out of order.

## Frontend configuration
In `index.html`, set:

```js
window.SERBIA_APP_CONFIG = {
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabaseAnonKey: "YOUR_PUBLISHABLE_OR_ANON_KEY",
  appVersion: "2.0.0"
};
```

Never put a `service_role` key in browser code.

## Authentication
Supabase Auth uses email/password in the upgraded portal. The proposal form's email remains optional, but a candidate needs an authenticated account to access a private dashboard from another device. Candidates without email can still submit an application, but a staff/admin workflow should create/link an authentication method before giving them private dashboard access.

## Payment proof
Files are uploaded to the private `candidate-files` bucket under:

`<candidate_id>/payments/<payment_id>/...`

Payment rows remain `under_review` until staff/admin verifies them.
