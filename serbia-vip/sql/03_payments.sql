-- BATCH 3/8: Payment schedule, payment requests, proof and receipts
create type public.payment_status as enum ('requested','submitted','under_review','verified','rejected','refunded','cancelled');
create type public.payment_method as enum ('bank_transfer','upi','net_banking','cash_office','cash_home','other');

create table if not exists public.payment_stages (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  stage_code text not null,
  stage_label text not null,
  amount numeric(12,2) not null,
  sequence_no integer not null,
  status text not null default 'upcoming',
  due_at timestamptz,
  created_at timestamptz not null default now(),
  unique(application_id, stage_code)
);

create table if not exists public.payment_requests (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  payment_stage_id uuid references public.payment_stages(id) on delete set null,
  request_ref text not null unique,
  amount numeric(12,2) not null,
  method public.payment_method,
  status public.payment_status not null default 'requested',
  payer_name text,
  payer_mobile text,
  payer_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  payment_request_id uuid not null references public.payment_requests(id) on delete cascade,
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  application_id uuid not null references public.applications(id) on delete cascade,
  amount numeric(12,2) not null,
  method public.payment_method not null,
  transaction_id text not null,
  payment_date date not null,
  paid_from text,
  proof_path text,
  proof_name text,
  status public.payment_status not null default 'under_review',
  submitted_at timestamptz not null default now(),
  verified_at timestamptz,
  verified_by uuid references auth.users(id) on delete set null,
  notes text
);

create table if not exists public.payment_receipts (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid not null unique references public.payments(id) on delete cascade,
  receipt_number text not null unique,
  receipt_pdf_path text,
  issued_at timestamptz not null default now()
);

create index if not exists payment_requests_candidate_idx on public.payment_requests(candidate_id);
create index if not exists payments_candidate_idx on public.payments(candidate_id);
create index if not exists payments_txn_idx on public.payments(transaction_id);
