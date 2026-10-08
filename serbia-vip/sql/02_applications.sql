-- BATCH 2/8: Applications and proposals
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  proposal_ref text not null unique,
  country text not null default 'Serbia',
  program_name text not null default 'Serbia Career Package',
  selected_roles text[] default '{}',
  status public.application_status not null default 'submitted',
  package_total numeric(12,2) not null default 300000,
  processing_total numeric(12,2) not null default 150000,
  deferred_total numeric(12,2) not null default 150000,
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  proposal_ref text not null unique,
  proposal_pdf_path text,
  signature_path text,
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists applications_candidate_idx on public.applications(candidate_id);
create index if not exists proposals_candidate_idx on public.proposals(candidate_id);

create or replace function public.generate_candidate_ref()
returns text language plpgsql as $$
declare r text;
begin
  loop
    r := 'SRB-' || extract(year from now())::int || '-' || lpad((floor(random()*100000000))::bigint::text,8,'0');
    exit when not exists(select 1 from public.candidates where application_ref=r);
  end loop;
  return r;
end; $$;
