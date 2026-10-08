# Serbia Career Gateway — FINAL FROZEN V3.1

## Frozen changes
1. Supabase email-confirmation dependency removed from the candidate UX.
2. Duplicate top-menu Install App controls removed; the remaining control is icon-only.
3. After a valid proposal signature, the candidate account is created automatically and the candidate is taken to the dashboard.
4. Username rule:
   - email supplied -> email is the username
   - no email -> first name + last 4 passport characters
5. Initial password uses the same value as the username.
6. Candidate is prompted to change the initial password immediately in the dashboard.

## Supabase
URL:
https://csjfidgeeqyqdbxnilno.supabase.co

Use only the publishable browser key in the frontend.

## Important Auth setting
For the requested no-confirmation flow, in Supabase Dashboard go to:
Authentication -> Providers -> Email
and turn OFF "Confirm email".

Do not expose or put a service-role key in this project.

## Deployment
Upload/replace the project files in GitHub. Serve over HTTPS for PWA installation.
