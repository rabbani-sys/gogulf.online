-- BATCH 7/8: RLS and Storage security
alter table public.profiles enable row level security;
alter table public.candidates enable row level security;
alter table public.applications enable row level security;
alter table public.proposals enable row level security;
alter table public.payment_stages enable row level security;
alter table public.payment_requests enable row level security;
alter table public.payments enable row level security;
alter table public.payment_receipts enable row level security;
alter table public.candidate_documents enable row level security;
alter table public.process_events enable row level security;
alter table public.notifications enable row level security;
alter table public.support_requests enable row level security;
alter table public.staff_roles enable row level security;
alter table public.audit_log enable row level security;

drop policy if exists profiles_self on public.profiles;
create policy profiles_self on public.profiles for all to authenticated using (id=auth.uid()) with check (id=auth.uid());

drop policy if exists candidates_owner on public.candidates;
create policy candidates_owner on public.candidates for all to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());

drop policy if exists applications_owner on public.applications;
create policy applications_owner on public.applications for all to authenticated using (candidate_id in (select id from public.candidates where user_id=auth.uid())) with check (candidate_id in (select id from public.candidates where user_id=auth.uid()));

drop policy if exists proposals_owner on public.proposals;
create policy proposals_owner on public.proposals for all to authenticated using (candidate_id in (select id from public.candidates where user_id=auth.uid())) with check (candidate_id in (select id from public.candidates where user_id=auth.uid()));

drop policy if exists payment_stages_owner on public.payment_stages;
create policy payment_stages_owner on public.payment_stages for select to authenticated using (application_id in (select id from public.applications where candidate_id in (select id from public.candidates where user_id=auth.uid())));

drop policy if exists payment_requests_owner on public.payment_requests;
create policy payment_requests_owner on public.payment_requests for all to authenticated using (candidate_id in (select id from public.candidates where user_id=auth.uid())) with check (candidate_id in (select id from public.candidates where user_id=auth.uid()));

drop policy if exists payments_owner on public.payments;
create policy payments_owner on public.payments for select to authenticated using (candidate_id in (select id from public.candidates where user_id=auth.uid()));
create policy payments_insert_owner on public.payments for insert to authenticated with check (candidate_id in (select id from public.candidates where user_id=auth.uid()));

drop policy if exists receipts_owner on public.payment_receipts;
create policy receipts_owner on public.payment_receipts for select to authenticated using (payment_id in (select id from public.payments where candidate_id in (select id from public.candidates where user_id=auth.uid())));

drop policy if exists docs_owner on public.candidate_documents;
create policy docs_owner on public.candidate_documents for all to authenticated using (candidate_id in (select id from public.candidates where user_id=auth.uid())) with check (candidate_id in (select id from public.candidates where user_id=auth.uid()));

drop policy if exists events_owner on public.process_events;
create policy events_owner on public.process_events for select to authenticated using (candidate_id in (select id from public.candidates where user_id=auth.uid()));

drop policy if exists notifications_owner on public.notifications;
create policy notifications_owner on public.notifications for all to authenticated using (candidate_id in (select id from public.candidates where user_id=auth.uid())) with check (candidate_id in (select id from public.candidates where user_id=auth.uid()));

drop policy if exists support_owner on public.support_requests;
create policy support_owner on public.support_requests for all to authenticated using (candidate_id in (select id from public.candidates where user_id=auth.uid())) with check (candidate_id in (select id from public.candidates where user_id=auth.uid()));

-- Staff/admin helper. Keep role assignment restricted to service-role/server-side admin operations.
create or replace function public.is_staff_or_admin(uid uuid default auth.uid())
returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.staff_roles where user_id=uid and active=true and role in ('staff','admin'));
$$;

create policy staff_read_candidates on public.candidates for select to authenticated using (public.is_staff_or_admin());
create policy staff_update_candidates on public.candidates for update to authenticated using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy staff_read_payments on public.payments for select to authenticated using (public.is_staff_or_admin() or candidate_id in (select id from public.candidates where user_id=auth.uid()));
create policy staff_update_payments on public.payments for update to authenticated using (public.is_staff_or_admin()) with check (public.is_staff_or_admin());
create policy staff_read_audit on public.audit_log for select to authenticated using (public.is_staff_or_admin());

-- Storage: candidates can access only their own folder: candidate-files/<candidate_id>/...
drop policy if exists candidate_files_select on storage.objects;
create policy candidate_files_select on storage.objects for select to authenticated using (bucket_id='candidate-files' and (storage.foldername(name))[1] in (select id::text from public.candidates where user_id=auth.uid()));
drop policy if exists candidate_files_insert on storage.objects;
create policy candidate_files_insert on storage.objects for insert to authenticated with check (bucket_id='candidate-files' and (storage.foldername(name))[1] in (select id::text from public.candidates where user_id=auth.uid()));
drop policy if exists candidate_files_update on storage.objects;
create policy candidate_files_update on storage.objects for update to authenticated using (bucket_id='candidate-files' and (storage.foldername(name))[1] in (select id::text from public.candidates where user_id=auth.uid()));
drop policy if exists candidate_files_delete on storage.objects;
create policy candidate_files_delete on storage.objects for delete to authenticated using (bucket_id='candidate-files' and (storage.foldername(name))[1] in (select id::text from public.candidates where user_id=auth.uid()));
