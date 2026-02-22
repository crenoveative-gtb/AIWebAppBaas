-- Keep PostgREST schema list valid and include EzyAIAgent.
-- Invalid/non-existing schemas in pgrst.db_schemas can break Data API with PGRST002.
do $$
declare
  current_list text;
  raw_schemas text[];
  schema_name text;
  valid_schemas text[] := array[]::text[];
begin
  select split_part(cfg, '=', 2)
    into current_list
  from pg_roles r
  cross join lateral unnest(coalesce(r.rolconfig, '{}'::text[])) cfg
  where r.rolname = 'authenticator'
    and cfg like 'pgrst.db_schemas=%'
  limit 1;

  if current_list is null or btrim(current_list) = '' then
    raw_schemas := array['public', 'graphql_public'];
  else
    raw_schemas := string_to_array(current_list, ',');
  end if;

  foreach schema_name in array raw_schemas loop
    schema_name := btrim(schema_name);
    if schema_name <> ''
       and exists (select 1 from pg_namespace where nspname = schema_name)
       and not schema_name = any(valid_schemas) then
      valid_schemas := array_append(valid_schemas, schema_name);
    end if;
  end loop;

  if exists (select 1 from pg_namespace where nspname = 'EzyAIAgent')
     and not 'EzyAIAgent' = any(valid_schemas) then
    valid_schemas := array_append(valid_schemas, 'EzyAIAgent');
  end if;

  if array_length(valid_schemas, 1) is null then
    valid_schemas := array['public', 'graphql_public'];
  end if;

  execute format(
    'alter role authenticator set pgrst.db_schemas = %L',
    array_to_string(valid_schemas, ',')
  );
  perform pg_notify('pgrst', 'reload config');
  perform pg_notify('pgrst', 'reload schema');
end
$$;

-- Edge function uses service_role; grant schema/table rights explicitly.
grant usage on schema "EzyAIAgent" to service_role;
grant all privileges on all tables in schema "EzyAIAgent" to service_role;
grant all privileges on all sequences in schema "EzyAIAgent" to service_role;
alter default privileges in schema "EzyAIAgent" grant all on tables to service_role;
alter default privileges in schema "EzyAIAgent" grant all on sequences to service_role;
