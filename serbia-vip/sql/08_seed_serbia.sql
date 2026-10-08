-- BATCH 8/8: Serbia payment schedule seed helper
create or replace function public.create_serbia_payment_schedule(p_application_id uuid)
returns void language plpgsql security definer set search_path=public as $$
begin
  insert into public.payment_stages(application_id,stage_code,stage_label,amount,sequence_no,status)
  values
    (p_application_id,'stage-1','Package Start / Registration',50000,1,'due'),
    (p_application_id,'stage-2','Work Permit Approved + Soft Copy',50000,2,'upcoming'),
    (p_application_id,'stage-3','Work Permit & Visa Docs Ready',50000,3,'upcoming'),
    (p_application_id,'deferred','Deferred Balance After Job Joining',150000,4,'upcoming')
  on conflict (application_id,stage_code) do nothing;
end; $$;

create or replace function public.create_candidate_application(
  p_first_name text,
  p_last_name text,
  p_passport text,
  p_mobile text,
  p_email text,
  p_roles text[],
  p_signature_path text default null
)
returns jsonb language plpgsql security definer set search_path=public as $$
declare
  c public.candidates;
  a public.applications;
begin
  insert into public.candidates(user_id,application_ref,first_name,last_name,passport_number,mobile,email,preferred_roles,source,status,signature_path)
  values(auth.uid(),public.generate_candidate_ref(),p_first_name,p_last_name,p_passport,p_mobile,nullif(p_email,''),coalesce(p_roles,'{}'), 'serbia-career-gateway','submitted',p_signature_path)
  returning * into c;

  insert into public.applications(candidate_id,proposal_ref,selected_roles,status)
  values(c.id,c.application_ref,coalesce(p_roles,'{}'),'submitted')
  returning * into a;

  perform public.create_serbia_payment_schedule(a.id);
  insert into public.process_events(candidate_id,application_id,event_code,title,status,completed_at)
  values(c.id,a.id,'registration','Application Submitted','completed',now()),
        (c.id,a.id,'processing','Processing Started','pending',null);

  insert into public.notifications(candidate_id,title,message,notification_type)
  values(c.id,'Application Submitted','Your Serbia career application has been received.','application');

  return jsonb_build_object('candidate',to_jsonb(c),'application',to_jsonb(a));
end; $$;

revoke all on function public.create_candidate_application(text,text,text,text,text,text[],text) from public;
grant execute on function public.create_candidate_application(text,text,text,text,text,text[],text) to authenticated;

-- Public proposal submission for the short form when the candidate has not created
-- an Auth account yet. It returns only the generated reference, never the full row.
create or replace function public.create_public_candidate_application(
  p_first_name text,
  p_last_name text,
  p_passport text,
  p_mobile text,
  p_email text,
  p_roles text[],
  p_signature_path text default null
)
returns text language plpgsql security definer set search_path=public as $$
declare c public.candidates; a public.applications;
begin
  insert into public.candidates(user_id,application_ref,first_name,last_name,passport_number,mobile,email,preferred_roles,source,status,signature_path)
  values(null,public.generate_candidate_ref(),p_first_name,p_last_name,p_passport,p_mobile,nullif(p_email,''),coalesce(p_roles,'{}'),'serbia-career-gateway','submitted',p_signature_path)
  returning * into c;
  insert into public.applications(candidate_id,proposal_ref,selected_roles,status)
  values(c.id,c.application_ref,coalesce(p_roles,'{}'),'submitted') returning * into a;
  perform public.create_serbia_payment_schedule(a.id);
  insert into public.process_events(candidate_id,application_id,event_code,title,status,completed_at)
  values(c.id,a.id,'registration','Application Submitted','completed',now());
  insert into public.notifications(candidate_id,title,message,notification_type)
  values(c.id,'Application Submitted','Your Serbia career application has been received.','application');
  return c.application_ref;
end; $$;
revoke all on function public.create_public_candidate_application(text,text,text,text,text,text[],text) from public;
grant execute on function public.create_public_candidate_application(text,text,text,text,text,text[],text) to anon, authenticated;

-- Claim an existing public application after the candidate signs in.
create or replace function public.claim_candidate_application(p_ref text, p_mobile text)
returns boolean language plpgsql security definer set search_path=public as $$
declare uid uuid := auth.uid();
begin
  if uid is null then raise exception 'Authentication required'; end if;
  update public.candidates
  set user_id=uid, updated_at=now()
  where application_ref=p_ref and mobile=p_mobile and user_id is null;
  return found;
end; $$;
revoke all on function public.claim_candidate_application(text,text) from public;
grant execute on function public.claim_candidate_application(text,text) to authenticated;
