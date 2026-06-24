-- ═══════════════════════════════════════════════════════════
-- Active Fitness — Supabase Initial Migration
-- ═══════════════════════════════════════════════════════════

-- 1. PROFILES TABLE (links auth.users to app-level role & info)
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

-- Helper to check admin role without causing RLS recursion
create or replace function public.is_admin()
returns boolean as $$
  select role = 'admin' from public.profiles where id = auth.uid();
$$ language sql security definer;

-- Auto-create profile on signup (copies role from user_metadata)
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

-- Sync email if it changes in auth
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

-- RLS: users read own profile; admins read all
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (public.is_admin());

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);


-- 2. MEMBERS TABLE (people who have purchased a membership)
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

-- RLS: admins only
create policy "Admins can manage members"
  on public.members for all
  using (public.is_admin());


-- 3. CONTACT SUBMISSIONS (from the website contact form)
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

-- RLS: anyone can insert; only admins can read
create policy "Anyone can submit contact form"
  on public.contact_submissions for insert
  with check (true);

create policy "Admins can read contact submissions"
  on public.contact_submissions for select
  using (public.is_admin());

create policy "Admins can update contact submissions"
  on public.contact_submissions for update
  using (public.is_admin());


-- 4. MEMBERSHIP PLANS (pricing plans shown on the site)
create table if not exists public.membership_plans (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  price         numeric(10, 2) not null,
  period        text not null, -- 'mo', '3mo', 'yr'
  description   text,
  features jsonb not null default '[]',
  admission_fee numeric(10, 2) not null default 0,
  is_featured boolean not null default false,
  is_active     boolean not null default true,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
alter table public.membership_plans enable row level security;

-- RLS: anyone can read active plans; admins can manage
create policy "Anyone can view active plans"
  on public.membership_plans for select
  using (is_active = true);

create policy "Admins can manage plans"
  on public.membership_plans for all
  using (public.is_admin());


-- 5. WORKOUT PLANS (training programmes shown on the site)
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

-- RLS: anyone can read active plans; admins can manage
create policy "Anyone can view active workout plans"
  on public.workout_plans for select
  using (is_active = true);

create policy "Admins can manage workout plans"
  on public.workout_plans for all
  using (public.is_admin());


-- ═══════════════════════════════════════════════════════════
-- SEED DATA — default membership & workout plans
-- ═══════════════════════════════════════════════════════════

insert into public.membership_plans (name, price, period, features, admission_fee, is_featured, sort_order) values
  ('Monthly',   2500, 'mo',  '["Full gym access","All equipment included","7 days a week","Locker access","Free fitness consultation"]',            1000, false, 1),
  ('Quarterly', 6500, '3mo', '["Full gym access","All equipment included","7 days a week","Locker access","Priority support","1 free personal training session","Priority class booking"]', 1000, true,  2),
  ('Annual',    22000, 'yr', '["Full gym access","All equipment included","7 days a week","Locker access","Priority support","3 free personal training sessions","Free nutrition consultation","Free 1 month bonus"]', 1000, false, 3);

insert into public.workout_plans (name, days_per_week, description, sort_order) values
  ('Strength Builder',  '3 Days / Week', 'Focused compound lifts to build raw strength and power. Squat, bench, deadlift — the essentials.',  1),
  ('Fat Burner',        '5 Days / Week', 'High-intensity circuits and conditioning work designed to maximise caloric burn and improve endurance.', 2),
  ('Body Composition',  '4 Days / Week', 'Balanced hypertrophy programme combining resistance training with targeted cardio for lean muscle growth.', 3);
