-- Adds the optional "what does your team keep chasing" field captured by the website lead form.
alter table public.leads add column if not exists challenge text not null default '';
