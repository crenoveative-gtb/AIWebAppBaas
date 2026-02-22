create schema if not exists "EzyAIAgent";

create table if not exists "EzyAIAgent"."api_keys_store_v2" (
  user_id uuid primary key,
  gemini_api_key text not null default '',
  openrouter_api_key text not null default '',
  groq_api_key text not null default '',
  aimlapi_api_key text not null default '',
  huggingface_api_key text not null default '',
  pollinations_api_key text not null default '',
  replicate_api_key text not null default '',
  pollo_api_key text not null default '',
  bfl_api_key text not null default '',
  renderful_api_key text not null default '',
  kie_api_key text not null default '',
  fal_api_key text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists "EzyAIAgent"."conversations" (
  id uuid primary key,
  user_id uuid not null,
  title text not null,
  provider text not null,
  model text not null,
  system_prompt text,
  agent_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists "EzyAIAgent"."messages" (
  id uuid primary key,
  user_id uuid not null,
  conversation_id uuid not null references "EzyAIAgent"."conversations"(id) on delete cascade,
  role text not null,
  content text not null,
  image_url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists "EzyAIAgent"."prompt_library_items" (
  id uuid primary key,
  user_id uuid not null,
  name text not null,
  description text not null default '',
  category text not null default 'Custom',
  text text not null,
  starred boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists "EzyAIAgent"."agent_profiles" (
  id uuid primary key,
  user_id uuid not null,
  name text not null,
  emoji text not null default '🤖',
  description text not null default '',
  system_prompt text not null,
  provider text not null default 'gemini',
  model text not null default '',
  temperature double precision not null default 0.7,
  max_tokens integer not null default 1024,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_conversations_user_updated_at on "EzyAIAgent"."conversations"(user_id, updated_at desc);
create index if not exists idx_messages_user_conversation_created_at on "EzyAIAgent"."messages"(user_id, conversation_id, created_at asc);
create index if not exists idx_prompt_library_user_updated_at on "EzyAIAgent"."prompt_library_items"(user_id, updated_at desc);
create index if not exists idx_agent_profiles_user_updated_at on "EzyAIAgent"."agent_profiles"(user_id, updated_at desc);

-- Realtime publication for cross-tab/project sync
do $$
begin
  if exists(select 1 from pg_publication where pubname='supabase_realtime') then
    if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='EzyAIAgent' and tablename='conversations') then
      execute 'alter publication supabase_realtime add table "EzyAIAgent"."conversations"';
    end if;
    if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='EzyAIAgent' and tablename='messages') then
      execute 'alter publication supabase_realtime add table "EzyAIAgent"."messages"';
    end if;
    if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='EzyAIAgent' and tablename='prompt_library_items') then
      execute 'alter publication supabase_realtime add table "EzyAIAgent"."prompt_library_items"';
    end if;
    if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='EzyAIAgent' and tablename='agent_profiles') then
      execute 'alter publication supabase_realtime add table "EzyAIAgent"."agent_profiles"';
    end if;
  end if;
end$$;
