-- BATCH 1/8: Core identity, candidates, profiles
create extension if not exists pgcrypto;

create type public.user_role as enum ('candidate','staff','admin');
create type public.application_status as enum ('draft','submitted','processing','selected','work_permit','visa','travel','completed','rejected','cancelled');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  mobile text,
  role public.user_role not null default 'candidate',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.candidates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete set null,
  application_ref text unique not null,
  first_name text not null,
  last_name text,
  full_name text generated always as (trim(concat_ws(' ', first_name, last_name))) stored,
  passport_number text,
  mobile text not null,
  email text,
  nationality text,
  country text default 'Serbia',
  preferred_roles text[] default '{}',
  source text,
  status public.application_status not null default 'draft',
  signature_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists candidates_user_id_idx on public.candidates(user_id);
create index if not exists candidates_mobile_idx on public.candidates(mobile);
create index if not exists candidates_status_idx on public.candidates(status);

create or replace function public.handle_profile_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
for each row execute function public.handle_profile_updated_at();

drop trigger if exists candidates_updated_at on public.candidates;
create trigger candidates_updated_at before update on public.candidates
for each row execute function public.handle_profile_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles(id, full_name, email)
  values (new.id, nullif(new.raw_user_meta_data->>'full_name',''), new.email)
  on conflict (id) do update set email=excluded.email, full_name=coalesce(excluded.full_name, profiles.full_name);
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();
