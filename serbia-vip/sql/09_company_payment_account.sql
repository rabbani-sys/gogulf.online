-- FINAL PAYMENT ACCOUNT — Serbia Career Gateway
-- Run once in Supabase SQL Editor using an authorized SQL-editor session.
-- This is the designated company/finance receiving account supplied by the business owner.

insert into public.company_payment_accounts
(account_name, payment_type, bank_name, account_holder, account_number, ifsc_code, branch_name, upi_id, instructions, active)
select
  'Serbia Career Gateway - Company Finance Account',
  'bank_transfer',
  'SBI (State Bank of India)',
  'Kaniz Fatma',
  '44624622176',
  'SBIN0005602',
  'Picnic Garden',
  null,
  'Designated company/finance payment account. The account holder name is displayed exactly as registered with the bank. Make payment only against an active payment request generated in the candidate dashboard. Payment proof remains under review until verified by authorized staff/admin.',
  true
where not exists (
  select 1 from public.company_payment_accounts
  where account_number = '44624622176' and ifsc_code = 'SBIN0005602'
);

-- Optional: deactivate older/placeholder accounts if they were created during testing.
-- Review before running in a live environment:
-- update public.company_payment_accounts set active=false
-- where account_number is null or account_number in ('ADD ACCOUNT NUMBER','ACCOUNT_NUMBER');
