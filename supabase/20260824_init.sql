-- NAVYK initial Supabase schema.
-- Apply this migration once in the Supabase SQL Editor.

create extension if not exists "uuid-ossp";

-- Identity and organization profiles.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'student' check (role in ('student', 'employer', 'university', 'mentor', 'admin')),
  name text,
  email text,
  avatar_url text,
  institution text,
  company_name text,
  department text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.universities (
  id uuid primary key references auth.users(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  location text,
  founded_year integer,
  ranking integer,
  website text,
  description text,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.employers (
  id uuid primary key references auth.users(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  company_name text not null,
  industry text,
  company_size text check (company_size in ('startup', 'small', 'medium', 'large', 'enterprise')),
  website text,
  description text,
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Repair the typo from the earlier draft migration if it was already applied.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'employers' and column_name = 'is_verifed'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'employers' and column_name = 'is_verified'
  ) then
    alter table public.employers rename column is_verifed to is_verified;
  end if;
end;
$$;

create table if not exists public.students (
  id uuid primary key references auth.users(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  university_id uuid references public.universities(id) on delete set null,
  graduation_year integer,
  current_course integer,
  skills text[] not null default '{}'::text[],
  achievements jsonb not null default '[]'::jsonb,
  status text not null default 'active' check (status in ('active', 'graduated', 'on_leave')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Jobs and applications.
create table if not exists public.jobs (
  id uuid primary key default uuid_generate_v4(),
  employer_id uuid not null references public.employers(id) on delete cascade,
  title text not null,
  description text,
  requirements text,
  location text,
  salary_min integer,
  salary_max integer,
  remote boolean not null default false,
  employment_type text check (employment_type in ('full_time', 'part_time', 'internship', 'contract')),
  status text not null default 'open' check (status in ('open', 'closed', 'filled')),
  view_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.job_applications (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'review', 'interview', 'offer', 'rejected')),
  cover_letter text,
  resume_url text,
  applied_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (job_id, student_id)
);

-- Events and registrations.
create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  university_id uuid references public.universities(id) on delete cascade,
  title text not null,
  description text,
  event_type text check (event_type in ('workshop', 'conference', 'career_fair', 'hackathon', 'info_session')),
  start_time timestamptz not null,
  end_time timestamptz,
  location text,
  max_participants integer,
  current_signups integer not null default 0,
  is_online boolean not null default false,
  online_url text,
  status text not null default 'upcoming' check (status in ('upcoming', 'ongoing', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.event_registrations (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references public.events(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  registered_at timestamptz not null default now(),
  attended boolean not null default false,
  feedback integer check (feedback is null or (attended = true and feedback between 1 and 5)),
  created_at timestamptz not null default now(),
  unique (event_id, student_id)
);

-- Student profile details and partnerships.
create table if not exists public.partners (
  id uuid primary key default uuid_generate_v4(),
  university_id uuid references public.universities(id) on delete cascade,
  employer_id uuid references public.employers(id) on delete cascade,
  partner_type text check (partner_type in ('sponsorship', 'internship', 'research', 'job_placement')),
  agreement text,
  status text not null default 'active' check (status in ('active', 'pending', 'expired')),
  started_at timestamptz,
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.student_skills (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.students(id) on delete cascade,
  skill_name text not null,
  proficiency_level text check (proficiency_level in ('beginner', 'intermediate', 'advanced', 'expert')),
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.achievements (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.students(id) on delete cascade,
  title text not null,
  description text,
  category text check (category in ('course', 'certification', 'project', 'hackathon', 'job', 'award')),
  date_earned timestamptz,
  credential_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.auth_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

-- Indexes used by the API.
create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_students_university on public.students(university_id);
create index if not exists idx_employers_verified on public.employers(is_verified);
create index if not exists idx_jobs_status on public.jobs(status);
create index if not exists idx_jobs_employer on public.jobs(employer_id);
create index if not exists idx_event_registrations_event on public.event_registrations(event_id);
create index if not exists idx_event_registrations_student on public.event_registrations(student_id);
create index if not exists idx_job_applications_job on public.job_applications(job_id);
create index if not exists idx_job_applications_student on public.job_applications(student_id);

-- Keep updated_at consistent for mutable tables.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array['profiles', 'universities', 'employers', 'students', 'jobs', 'job_applications', 'events', 'partners', 'auth_settings'] loop
    execute format('drop trigger if exists %I_set_updated_at on public.%I', table_name, table_name);
    execute format('create trigger %I_set_updated_at before update on public.%I for each row execute function public.set_updated_at()', table_name, table_name);
  end loop;
end;
$$;

-- Create a student profile automatically for every new Supabase Auth user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  new_role text;
begin
  new_role := case new.raw_user_meta_data->>'role'
    when 'employer' then 'employer'
    when 'university' then 'university'
    when 'mentor' then 'mentor'
    when 'admin' then 'admin'
    else 'student'
  end;

  insert into public.profiles (id, role, name, email, avatar_url)
  values (
    new.id,
    new_role,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name'),
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do update set email = excluded.email, updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row Level Security.
alter table public.profiles enable row level security;
alter table public.students enable row level security;
alter table public.universities enable row level security;
alter table public.employers enable row level security;
alter table public.jobs enable row level security;
alter table public.job_applications enable row level security;
alter table public.events enable row level security;
alter table public.event_registrations enable row level security;
alter table public.partners enable row level security;
alter table public.student_skills enable row level security;
alter table public.achievements enable row level security;
alter table public.auth_settings enable row level security;

-- The migration is intentionally rerunnable.
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "Students can view own student profile" on public.students;
drop policy if exists "Students can manage own student profile" on public.students;
create policy "Students can view own student profile" on public.students for select using (auth.uid() = id);
create policy "Students can manage own student profile" on public.students for all using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "Universities can view public profiles" on public.universities;
drop policy if exists "Universities can manage own profile" on public.universities;
create policy "Universities can view public profiles" on public.universities for select using (is_public = true or auth.uid() = id);
create policy "Universities can manage own profile" on public.universities for all using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "Employers can view verified profiles" on public.employers;
drop policy if exists "Employers can manage own profile" on public.employers;
create policy "Employers can view verified profiles" on public.employers for select using (is_verified = true or auth.uid() = id);
create policy "Employers can manage own profile" on public.employers for all using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "Public can view active jobs" on public.jobs;
drop policy if exists "Employers can manage own jobs" on public.jobs;
create policy "Public can view active jobs" on public.jobs for select using (status = 'open');
create policy "Employers can manage own jobs" on public.jobs for all using (auth.uid() = employer_id) with check (auth.uid() = employer_id);

drop policy if exists "Students can view own applications" on public.job_applications;
drop policy if exists "Students can create own applications" on public.job_applications;
drop policy if exists "Employers can view applications for own jobs" on public.job_applications;
create policy "Students can view own applications" on public.job_applications for select using (auth.uid() = student_id);
create policy "Students can create own applications" on public.job_applications for insert with check (auth.uid() = student_id);
create policy "Employers can view applications for own jobs" on public.job_applications for select using (
  exists (select 1 from public.jobs where jobs.id = job_applications.job_id and jobs.employer_id = auth.uid())
);

drop policy if exists "Public can view upcoming events" on public.events;
drop policy if exists "Universities can manage own events" on public.events;
create policy "Public can view upcoming events" on public.events for select using (status <> 'completed');
create policy "Universities can manage own events" on public.events for all using (auth.uid() = university_id) with check (auth.uid() = university_id);

drop policy if exists "Students can manage own registrations" on public.event_registrations;
drop policy if exists "Event owners can view registrations" on public.event_registrations;
create policy "Students can manage own registrations" on public.event_registrations for all using (auth.uid() = student_id) with check (auth.uid() = student_id);
create policy "Event owners can view registrations" on public.event_registrations for select using (
  exists (select 1 from public.events where events.id = event_registrations.event_id and events.university_id = auth.uid())
);

drop policy if exists "Organizations can view own partnerships" on public.partners;
drop policy if exists "Organizations can manage own partnerships" on public.partners;
create policy "Organizations can view own partnerships" on public.partners for select using (
  auth.uid() = university_id or auth.uid() = employer_id
);
create policy "Organizations can manage own partnerships" on public.partners for all using (
  auth.uid() = university_id or auth.uid() = employer_id
) with check (auth.uid() = university_id or auth.uid() = employer_id);

drop policy if exists "Students can manage own skills" on public.student_skills;
create policy "Students can manage own skills" on public.student_skills for all using (auth.uid() = student_id) with check (auth.uid() = student_id);

drop policy if exists "Students can manage own achievements" on public.achievements;
create policy "Students can manage own achievements" on public.achievements for all using (auth.uid() = student_id) with check (auth.uid() = student_id);

insert into public.auth_settings (key, value) values
  ('password_min_length', '8'),
  ('password_complexity', 'must_contain_letter_digit'),
  ('email_verification_required', 'false')
on conflict (key) do update set value = excluded.value, updated_at = now();
