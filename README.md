# EzyAIAgent_Bass (Serverless BaaS)

`EzyAIAgent_Bass` คือเวอร์ชันที่ใช้ **Supabase Edge Functions + Supabase DB/Storage/Auth** เป็น backend หลัก
โดย frontend เรียก API ผ่าน:

`https://<PROJECT>.supabase.co/functions/v1/ezyai-api/api/*`

## สถานะที่ย้ายแล้ว
- Settings / API Keys
- AI Test (providers, models, chat)
- Agent Run
- Conversations + Messages
- Prompt Library
- Agents
- Dashboard stats (DB)
- Image upload ใน Chat Core (`/api/upload-image`)

## โครงหลัก
- Frontend: `frontend`
- Edge Function: `supabase/functions/ezyai-api/index.ts`
- SQL migration: `supabase/migrations/20260222_bass_core.sql`

## Frontend Env
ตั้งค่าใน `frontend/.env`

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_FUNCTION_NAME=ezyai-api`
- `VITE_API_URL=` (ปล่อยว่างได้)
- `VITE_LOCAL_API_FALLBACKS=` (ใส่เฉพาะ dev local ถ้า function ยังไม่ deploy)

## Supabase Secrets (Edge Function)
ใน Supabase Dashboard > Edge Functions > Secrets

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_DB_SCHEMA=EzyAIAgent`
- `SUPABASE_STORAGE_BUCKET=Dev_Test`
- `SUPABASE_STORAGE_FOLDER=EzyAIAgent`
- `AIMLAPI_BASE_URL` (optional)
- `PUBLIC_BASE_URL` (optional)
- `AGENT_DEFAULT_MODEL` (optional)

## Deploy Edge Function
```bash
supabase functions deploy ezyai-api --project-ref <YOUR_PROJECT_REF>
```

## Deploy ผ่าน GitHub Actions
มี workflow ที่ไฟล์:
- `.github/workflows/deploy-ezyaiagent-bass.yml`

ต้องตั้ง GitHub Secrets ใน repo:
- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_PROJECT_REF` (เช่น `enyzwfwcnnqoccihctal`)

วิธีใช้:
1. Push เข้า `main`/`master` โดยมีการเปลี่ยนแปลงใน `supabase/**`
2. หรือรัน manual ที่ `Actions > Deploy Supabase Edge Function > Run workflow`

## Run Frontend
```bash
cd frontend
npm run dev
```

เปิด:
- `http://localhost:4305/EzyAIAgent_Bass`

## SQL Setup
รันไฟล์นี้หนึ่งครั้งใน Supabase SQL Editor:
- `supabase/migrations/20260222_bass_core.sql`

## หมายเหตุ cleanup
ลบโค้ด legacy ที่ไม่เกี่ยวออกแล้ว เหลือโครงใช้งานจริงเฉพาะ:
- `frontend/`
- `supabase/`
- ไฟล์ตั้งค่าระดับโปรเจกต์ (`package.json`, `README.md`, `.gitignore`)
