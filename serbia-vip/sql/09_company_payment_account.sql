-- Run once after the existing 8 Serbia database batches.
insert into public.company_payment_accounts
(account_name,payment_type,bank_name,account_holder,account_number,ifsc_code,branch_name,upi_id,instructions,active)
values
('Serbia Career Gateway - Company Finance Account','BANK_TRANSFER','SBI','Kaniz Fatma','44624622176','SBIN0005602','Picnic Garden',NULL,
'Designated company/finance receiving account. Candidate payments must be made only against an active payment request shown in the candidate dashboard. Bank account holder is displayed exactly as registered with the bank.',
true);
