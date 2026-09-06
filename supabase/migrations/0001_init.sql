-- Learning Journal schema: subjects -> categories -> entries.
-- Public read, owner-only write, enforced via RLS + is_owner().

create extension if not exists "pgcrypto";

create table if not exists subjects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references subjects(id) on delete cascade,
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  unique (subject_id, name)
);

create table if not exists entries (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references subjects(id) on delete cascade,
  category_id uuid references categories(id) on delete set null,
  problem text not null,
  entry_date date not null,
  "trigger" text,
  invariant text,
  complexity text,
  taught_with text,
  first_mistake text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Replace '00000000-0000-0000-0000-000000000000' with the owner's real
-- Supabase auth.users.id after their first GitHub OAuth sign-in (see
-- supabase/README.md). This function is the single place that decides who
-- may write -- every write policy below just calls it.
create or replace function public.is_owner()
returns boolean
language sql
stable
as $$
  select auth.uid() = '00000000-0000-0000-0000-000000000000'::uuid
$$;

alter table subjects enable row level security;
alter table categories enable row level security;
alter table entries enable row level security;

create policy "public read subjects" on subjects for select using (true);
create policy "owner insert subjects" on subjects for insert with check (is_owner());
create policy "owner update subjects" on subjects for update using (is_owner()) with check (is_owner());
create policy "owner delete subjects" on subjects for delete using (is_owner());

create policy "public read categories" on categories for select using (true);
create policy "owner insert categories" on categories for insert with check (is_owner());
create policy "owner update categories" on categories for update using (is_owner()) with check (is_owner());
create policy "owner delete categories" on categories for delete using (is_owner());

create policy "public read entries" on entries for select using (true);
create policy "owner insert entries" on entries for insert with check (is_owner());
create policy "owner update entries" on entries for update using (is_owner()) with check (is_owner());
create policy "owner delete entries" on entries for delete using (is_owner());
