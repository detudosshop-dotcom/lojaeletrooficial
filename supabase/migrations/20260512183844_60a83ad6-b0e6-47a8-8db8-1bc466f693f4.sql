create table if not exists public.pagouai_orders (
  transaction_id text primary key,
  order_id text not null,
  created_at timestamptz not null default now(),
  amount_cents integer not null,
  customer jsonb not null,
  products jsonb not null,
  tracking jsonb not null,
  paid_notified boolean not null default false,
  paid_at timestamptz
);

alter table public.pagouai_orders enable row level security;

-- No public policies: only service role (server) can read/write.
