# Serbia Career Gateway — FINAL LIVE V4.1

## Critical fixes in V4.1
- Fixed the JavaScript parse error that stopped the entire application from running and left the splash screen permanently visible.
- Added a production safety fallback that always releases the splash screen.
- Fixed automatic proposal account creation flow.
- Candidate is taken to the dashboard after a signed proposal.
- Email is optional.
- If email exists: username = email.
- If no email: username = first name + last 4 passport characters.
- Initial password = generated username; candidate is immediately prompted to change it.
- Only one top-menu Install App control remains, icon-only.
- Removed visible Production wording.
- Added mobile field ID so the account bootstrap receives the submitted mobile number.

## Supabase requirement
In Supabase Dashboard, Authentication -> Providers -> Email, turn OFF Confirm email. This is an account-level setting and cannot safely be disabled from browser JavaScript.

## Deployment
Replace the old GitHub project files with this ZIP contents. Use HTTPS. After replacement, hard refresh the site and, if the old PWA is installed, uninstall/reinstall it so the new service-worker/cache is used.

Do not put a service-role key or database password in GitHub.


## V4.1 navigation freeze
- After proposal signature/account creation, dashboard opens in the same tab.
- No Login Portal text is shown in the top navigation.
- Candidate dashboard uses icon-based navigation.


## V4.1 dashboard access
A persistent Dashboard CTA appears after authentication. After a signed proposal creates the account, the dashboard opens automatically in the same tab. Dashboard contains icon navigation for Overview, Application, Proposal, Payments, Documents, Timeline, Notifications and Support.


## V4.1 final readiness
- Visible Dashboard CTA after account/session creation.
- Same-tab automatic dashboard entry after signed proposal.
- Email Address field explicitly marked Optional in the proposal form.
- No Login Portal dependency after signing.
- Dashboard feature icons: Overview, Application, Proposal, Payments, Documents, Timeline, Notifications, Support.
- Splash-screen emergency fallback prevents a blank/stuck first screen.


## V4.1 signature fix
The signature canvas uses a dedicated pointer-event drawing layer, prevents touch scrolling over the signing area, preserves a white canvas, and supplies signature data directly to proposal submission.
