# Serbia Career Gateway — FINAL LIVE V3.4

## Critical fixes in V3.4
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


## V3.4 navigation freeze
- After proposal signature/account creation, dashboard opens in the same tab.
- No Login Portal text is shown in the top navigation.
- Candidate dashboard uses icon-based navigation.


## V3.4 dashboard access
A persistent Dashboard CTA appears after authentication. After a signed proposal creates the account, the dashboard opens automatically in the same tab. Dashboard contains icon navigation for Overview, Application, Proposal, Payments, Documents, Timeline, Notifications and Support.
