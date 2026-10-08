-- BATCH 6/8: Staff/admin controls and audit log
create table if not exists public.staff_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'staff',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references auth.users(id) on delete set null,
  candidate_id uuid references public.candidates(id) on delete set null,
  action text not null,
  module text,
  record_type text,
  record_id uuid,
  old_value jsonb,
  new_value jsonb,
  description text,
  created_at timestamptz not null default now()
);

create index if not exists audit_log_candidate_idx on public.audit_log(candidate_id);
create index if not exists audit_log_created_idx on public.audit_log(created_at desc);
