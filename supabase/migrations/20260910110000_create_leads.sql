create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text not null,
  role text not null,
  source text not null default 'website'
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;
