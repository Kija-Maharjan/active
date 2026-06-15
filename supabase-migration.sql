-- ═══════════════════════════════════════════════════════════
-- Active Fitness — Supabase Migration (copy-paste into SQL Editor)
-- ═══════════════════════════════════════════════════════════

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  role        text not null default 'member' check (role in ('member', 'admin')),
  full_name   text,
  phone       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.profiles enable row level security;

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'role', 'member'),
    new.raw_user_meta_data ->> 'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Sync email changes
create or replace function public.sync_profile_email()
returns trigger as $$
begin
  update public.profiles set email = new.email, updated_at = now()
  where id = new.id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_email_updated on auth.users;
create trigger on_auth_user_email_updated
  after update of email on auth.users
  for each row execute function public.sync_profile_email();

-- RLS
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);


-- 2. MEMBERS TABLE
create table if not exists public.members (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete set null,
  full_name     text not null,
  email         text,
  phone         text,
  plan          text not null default 'Monthly',
  start_date    date not null default current_date,
  end_date      date,
  status        text not null default 'active' check (status in ('active', 'expired', 'cancelled')),
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
alter table public.members enable row level security;

create policy "Admins can manage members"
  on public.members for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));


-- 3. CONTACT SUBMISSIONS
create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  message     text not null,
  is_read     boolean not null default false,
  created_at  timestamptz not null default now()
);
alter table public.contact_submissions enable row level security;

create policy "Anyone can submit contact form"
  on public.contact_submissions for insert
  with check (true);

create policy "Admins can read contact submissions"
  on public.contact_submissions for select
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create policy "Admins can update contact submissions"
  on public.contact_submissions for update
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));


-- 4. MEMBERSHIP PLANS
create table if not exists public.membership_plans (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  price         numeric(10, 2) not null,
  period        text not null,
  description   text,
  features      jsonb not null default '[]',
  is_featured   boolean not null default false,
  is_active     boolean not null default true,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
alter table public.membership_plans enable row level security;

create policy "Anyone can view active plans"
  on public.membership_plans for select
  using (is_active = true);

create policy "Admins can manage plans"
  on public.membership_plans for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));


-- 5. WORKOUT PLANS
create table if not exists public.workout_plans (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  days_per_week text,
  description   text,
  details       text,
  is_active     boolean not null default true,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
alter table public.workout_plans enable row level security;

create policy "Anyone can view active workout plans"
  on public.workout_plans for select
  using (is_active = true);

create policy "Admins can manage workout plans"
  on public.workout_plans for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));


-- ═══════════════════════════════════════════════════════════
-- SEED DATA
-- ═══════════════════════════════════════════════════════════

insert into public.membership_plans (name, price, period, features, is_featured, sort_order) values
  ('Monthly',   1500, 'mo',  '["Full gym access","All equipment included","7 days a week","Locker access"]',                        false, 1),
  ('Quarterly', 4000, '3mo', '["Full gym access","All equipment included","7 days a week","Locker access","Priority support"]',    true,  2),
  ('Annual',    13000, 'yr', '["Full gym access","All equipment included","7 days a week","Locker access","Priority support","Free 1 month bonus"]', false, 3);

insert into public.workout_plans (name, days_per_week, description, sort_order) values
  ('Strength Builder',  '3 Days / Week', 'Focused compound lifts to build raw strength and power. Squat, bench, deadlift — the essentials.',  1),
  ('Fat Burner',        '5 Days / Week', 'High-intensity circuits and conditioning work designed to maximise caloric burn and improve endurance.', 2),
  ('Body Composition',  '4 Days / Week', 'Balanced hypertrophy programme combining resistance training with targeted cardio for lean muscle growth.', 3);
