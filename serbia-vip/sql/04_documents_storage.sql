-- BATCH 4/8: Candidate documents and private Storage bucket
create table if not exists public.candidate_documents (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  application_id uuid references public.applications(id) on delete cascade,
  document_type text not null,
  file_name text not null,
  storage_path text not null,
  mime_type text,
  file_size bigint,
  status text not null default 'submitted',
  uploaded_at timestamptz not null default now(),
  verified_at timestamptz,
  verified_by uuid references auth.users(id) on delete set null,
  notes text
);

insert into storage.buckets (id, name, public)
values ('candidate-files','candidate-files',false)
on conflict (id) do update set public=false;

create index if not exists candidate_documents_candidate_idx on public.candidate_documents(candidate_id);
