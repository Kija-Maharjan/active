-- Add admission_fee column to membership_plans
alter table public.membership_plans
  add column if not exists admission_fee numeric(10, 2) not null default 0;

-- Update existing plans with admission fee
update public.membership_plans set admission_fee = 1000 where admission_fee = 0;

-- Update pricing to new values
update public.membership_plans
set price = 2500, period = 'mo'
where name = 'Monthly' and price = 1500;

update public.membership_plans
set price = 6500, period = '3mo'
where name = 'Quarterly' and price = 4000;
