## 📂 Project Structure

```bash
my-booking-app/
├── app/                # Application routes and pages
│   ├── layout.tsx      # Global layout
│   └── page.tsx        # LuxuryBookingForm entry point
├── lib/                # Shared utilities
│   └── supabase.ts     # Supabase client initialization
├── public/             # Static assets (logos, high-res images)
├── .env.local          # Private API keys
└── package.json        # Dependencies and scripts
```

## 🚀 Getting Started

1.Initialize the Project

```bash
npx create-next-app@latest my-booking-app
```

2.Install Dependencies

```bash
npm install @supabase/supabase-js @supabase/ssr
```

3.Environment Setup

Create a `.env.local` file in the root directory and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-unique-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...... (your long anon key)
```

## 🏗 Database Schema & Security

Run the following SQL in your Supabase SQL Editor to set up the reservations table and Row Level Security (RLS).

```bash
-- 1. Delete the existing table and all its data
drop table if exists reservations;

-- 2. Create the refined table without the status column
create table reservations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  phone text not null,
  booking_date date not null,
  booking_time text not null,
  guest_count text not null,
  special_requests text
);

-- 3. Security: Enable Row Level Security
alter table reservations enable row level security;

-- 4. Policy: Allow anyone to book (Insert)
create policy "Allow public inserts" on reservations
for insert with check (true);

-- 5. Policy: Allow you to view bookings (Select)
create policy "Allow public selects for testing" on reservations
for select using (true);
```

Supabase Client Configuration `lib/supabase.ts`

```bash
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## 💻 Development

Run the development server:

```bash
npm run dev
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
