
import { createClient } from "npm:@supabase/supabase-js@2";

type ProviderId = "gemini" | "openrouter" | "groq" | "aimlapi";
type SettingsProviderId = ProviderId | "huggingface" | "pollinations" | "replicate" | "pollo" | "bfl" | "renderful" | "kie" | "fal";

type StoredKeys = {
  geminiApiKey: string;
  openrouterApiKey: string;
  groqApiKey: string;
  aimlapiApiKey: string;
  huggingfaceApiKey: string;
  pollinationsApiKey: string;
  replicateApiKey: string;
  polloApiKey: string;
  bflApiKey: string;
  renderfulApiKey: string;
  kieApiKey: string;
  falApiKey: string;
};

class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const SUPABASE_DB_SCHEMA = Deno.env.get("SUPABASE_DB_SCHEMA") ?? "EzyAIAgent";
const SUPABASE_STORAGE_BUCKET = Deno.env.get("SUPABASE_STORAGE_BUCKET") ?? "Dev_Test";
const SUPABASE_STORAGE_FOLDER = Deno.env.get("SUPABASE_STORAGE_FOLDER") ?? "EzyAIAgent";
const PUBLIC_BASE_URL = Deno.env.get("PUBLIC_BASE_URL") ?? "https://localhost";
const AIMLAPI_BASE_URL = Deno.env.get("AIMLAPI_BASE_URL") ?? "https://api.aimlapi.com/v1";
const AGENT_DEFAULT_MODEL = Deno.env.get("AGENT_DEFAULT_MODEL") ?? "claude-sonnet-4-6";

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const providerFieldMap: Record<SettingsProviderId, keyof StoredKeys> = {
  gemini: "geminiApiKey",
  openrouter: "openrouterApiKey",
  groq: "groqApiKey",
  aimlapi: "aimlapiApiKey",
  huggingface: "huggingfaceApiKey",
  pollinations: "pollinationsApiKey",
  replicate: "replicateApiKey",
  pollo: "polloApiKey",
  bfl: "bflApiKey",
  renderful: "renderfulApiKey",
  kie: "kieApiKey",
  fal: "falApiKey",
};

const settingsProviders = Object.keys(providerFieldMap) as SettingsProviderId[];
const allowedProviders: ProviderId[] = ["gemini", "openrouter", "groq", "aimlapi"];
const modelListProviders: SettingsProviderId[] = [...allowedProviders, "huggingface", "pollinations", "pollo", "replicate", "bfl", "renderful", "kie", "fal"];
const vertexAnthropicModels = ["claude-sonnet-4-6"];

const pollinationsImageModels = ["flux", "gptimage", "zimage", "imagen-4", "klein"];
const huggingFaceImageModels = ["black-forest-labs/FLUX.1-schnell", "black-forest-labs/FLUX.1-dev", "stabilityai/stable-diffusion-xl-base-1.0"];
const replicateImageModels = ["black-forest-labs/flux-schnell", "black-forest-labs/flux-dev", "google/imagen-4"];
const polloGenerationModels = ["pollo-v1", "pollo-v2"];
const bflImageModels = [{ id: "flux-dev", price: 0 }, { id: "flux-pro", price: 1 }];
const renderfulImageModels = ["flux-dev", "seedream", "gpt-image"];
const kieImageModels = ["gpt-image-1", "flux-kontext", "imagen-4", "seedream-3"];
const falImageModels = ["fal-ai/flux/dev", "fal-ai/recraft/v3/text-to-image"];

const emptyKeys: StoredKeys = {
  geminiApiKey: "",
  openrouterApiKey: "",
  groqApiKey: "",
  aimlapiApiKey: "",
  huggingfaceApiKey: "",
  pollinationsApiKey: "",
  replicateApiKey: "",
  polloApiKey: "",
  bflApiKey: "",
  renderfulApiKey: "",
  kieApiKey: "",
  falApiKey: "",
};

const keyToDbColumn: Record<keyof StoredKeys, string> = {
  geminiApiKey: "gemini_api_key",
  openrouterApiKey: "openrouter_api_key",
  groqApiKey: "groq_api_key",
  aimlapiApiKey: "aimlapi_api_key",
  huggingfaceApiKey: "huggingface_api_key",
  pollinationsApiKey: "pollinations_api_key",
  replicateApiKey: "replicate_api_key",
  polloApiKey: "pollo_api_key",
  bflApiKey: "bfl_api_key",
  renderfulApiKey: "renderful_api_key",
  kieApiKey: "kie_api_key",
  falApiKey: "fal_api_key",
};

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
  });
}

function normalizePath(pathname: string) {
  const stripped = pathname
    .replace(/^\/functions\/v1\/ezyai-api/, "")
    .replace(/^\/ezyai-api/, "");
  return stripped || "/";
}

function safeTrim(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

function isProviderId(v: unknown): v is ProviderId {
  return v === "gemini" || v === "openrouter" || v === "groq" || v === "aimlapi";
}

function isSettingsProviderId(v: unknown): v is SettingsProviderId {
  return typeof v === "string" && settingsProviders.includes(v as SettingsProviderId);
}

function maskKey(v: string) {
  const key = safeTrim(v);
  if (!key) return null;
  if (key.length <= 8) return `${key.slice(0, 2)}***${key.slice(-2)}`;
  return `${key.slice(0, 8)}...${key.slice(-4)}`;
}

function settingsPayload(keys: StoredKeys) {
  return {
    geminiApiKey: maskKey(keys.geminiApiKey),
    hasGeminiKey: !!keys.geminiApiKey,
    openrouterApiKey: maskKey(keys.openrouterApiKey),
    hasOpenrouterKey: !!keys.openrouterApiKey,
    groqApiKey: maskKey(keys.groqApiKey),
    hasGroqKey: !!keys.groqApiKey,
    aimlapiApiKey: maskKey(keys.aimlapiApiKey),
    hasAimlapiKey: !!keys.aimlapiApiKey,
    huggingfaceApiKey: maskKey(keys.huggingfaceApiKey),
    hasHuggingfaceKey: !!keys.huggingfaceApiKey,
    pollinationsApiKey: maskKey(keys.pollinationsApiKey),
    hasPollinationsKey: !!keys.pollinationsApiKey,
    replicateApiKey: maskKey(keys.replicateApiKey),
    hasReplicateKey: !!keys.replicateApiKey,
    polloApiKey: maskKey(keys.polloApiKey),
    hasPolloKey: !!keys.polloApiKey,
    bflApiKey: maskKey(keys.bflApiKey),
    hasBflKey: !!keys.bflApiKey,
    renderfulApiKey: maskKey(keys.renderfulApiKey),
    hasRenderfulKey: !!keys.renderfulApiKey,
    kieApiKey: maskKey(keys.kieApiKey),
    hasKieKey: !!keys.kieApiKey,
    falApiKey: maskKey(keys.falApiKey),
    hasFalKey: !!keys.falApiKey,
  };
}

async function requireUserId(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  if (!auth.toLowerCase().startsWith("bearer ")) throw new HttpError(401, "Unauthorized: missing bearer token");
  const token = auth.slice(7).trim();
  if (!token) throw new HttpError(401, "Unauthorized: missing bearer token");
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data?.user?.id) throw new HttpError(401, "Unauthorized");
  return data.user.id;
}

function normalizeInt(v: string | null, fallback: number) {
  const n = Number.parseInt(String(v ?? ""), 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function parseRemoteMessage(data: unknown, fallback: string) {
  if (!data || typeof data !== "object") return fallback;
  const obj = data as Record<string, unknown>;
  if (typeof obj.error === "string" && obj.error) return obj.error;
  if (typeof obj.message === "string" && obj.message) return obj.message;
  if (typeof obj.detail === "string" && obj.detail) return obj.detail;
  if (obj.error && typeof obj.error === "object") {
    const e = obj.error as Record<string, unknown>;
    if (typeof e.message === "string" && e.message) return e.message;
  }
  return fallback;
}

async function fetchJson(url: string, init: RequestInit, fallback: string) {
  const response = await fetch(url, init);
  const raw = await response.text();
  let data: unknown = null;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = null;
  }
  if (!response.ok) throw new HttpError(response.status, parseRemoteMessage(data, fallback));
  return data;
}

function providerHeaders(provider: ProviderId, apiKey: string) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  if (provider === "openrouter") {
    headers["HTTP-Referer"] = PUBLIC_BASE_URL;
    headers["X-Title"] = "EzyAIAgent_Bass";
  }
  return headers;
}

function providerBaseUrl(provider: ProviderId) {
  if (provider === "openrouter") return "https://openrouter.ai/api/v1";
  if (provider === "groq") return "https://api.groq.com/openai/v1";
  return AIMLAPI_BASE_URL;
}

function isVertexAnthropicModel(model: string) {
  return vertexAnthropicModels.includes(model.trim().toLowerCase());
}

function buildGeminiContents(messages: Array<{ role?: string; content?: string }> | undefined, prompt?: string) {
  const source = Array.isArray(messages) ? messages : [];
  const mapped = source
    .map((m) => {
      const content = safeTrim(m?.content);
      if (!content) return null;
      return {
        role: m?.role === "assistant" ? "model" : "user",
        parts: [{ text: content }],
      };
    })
    .filter(Boolean);
  if (mapped.length > 0) return mapped;
  const p = safeTrim(prompt);
  if (!p) return null;
  return [{ role: "user", parts: [{ text: p }] }];
}

function pickGeminiText(payload: unknown) {
  const candidates = (payload as Record<string, unknown>)?.candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) return "";
  const parts = ((candidates[0] as Record<string, unknown>)?.content as Record<string, unknown> | undefined)?.parts;
  if (!Array.isArray(parts)) return "";
  return parts
    .map((p) => (typeof (p as Record<string, unknown>)?.text === "string" ? (p as Record<string, unknown>).text as string : ""))
    .filter(Boolean)
    .join("\n")
    .trim();
}

function pickOpenAiText(payload: unknown) {
  const choices = (payload as Record<string, unknown>)?.choices;
  if (!Array.isArray(choices) || choices.length === 0) return "";
  const message = (choices[0] as Record<string, unknown>)?.message as Record<string, unknown> | undefined;
  const content = message?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((it) => (typeof it === "object" && it ? String((it as Record<string, unknown>).text ?? "") : ""))
      .filter(Boolean)
      .join("\n")
      .trim();
  }
  return "";
}

function normalizeGeminiModelNames(payload: unknown) {
  const list = (payload as Record<string, unknown>)?.models;
  if (!Array.isArray(list)) return [];
  return list
    .map((item) => {
      if (!item || typeof item !== "object") return "";
      const raw = (item as Record<string, unknown>).name ?? (item as Record<string, unknown>).model;
      return typeof raw === "string" ? raw : "";
    })
    .filter((v) => v.trim().length > 0)
    .map((v) => v.replace(/^models\//, ""));
}

async function listGeminiModels(apiKey: string) {
  const endpoints = [
    "https://generativelanguage.googleapis.com/v1beta/models",
    "https://generativelanguage.googleapis.com/v1/models",
  ];
  let last: unknown = null;
  for (const endpoint of endpoints) {
    try {
      return await fetchJson(`${endpoint}?key=${encodeURIComponent(apiKey)}`, { method: "GET" }, "Failed to list Gemini models");
    } catch (error) {
      last = error;
    }
  }
  if (last instanceof HttpError) throw last;
  throw new HttpError(500, "Failed to list Gemini models");
}

function toOpenAiPayload(body: Record<string, unknown>) {
  const source = Array.isArray(body.messages) ? body.messages : [];
  const prompt = safeTrim(body.prompt);
  const messages = source
    .map((msg) => {
      if (!msg || typeof msg !== "object") return null;
      const content = safeTrim((msg as Record<string, unknown>).content);
      if (!content) return null;
      return { role: (msg as Record<string, unknown>).role === "assistant" ? "assistant" : "user", content };
    })
    .filter(Boolean);

  if (messages.length === 0 && prompt) messages.push({ role: "user", content: prompt });

  return {
    model: safeTrim(body.model),
    messages,
    temperature: typeof body.temperature === "number" ? body.temperature : undefined,
    top_p: typeof body.top_p === "number" ? body.top_p : undefined,
    max_tokens: typeof body.max_tokens === "number" ? body.max_tokens : undefined,
    stream: false,
  };
}

async function generateWithGemini(args: { apiKey: string; model: string; prompt: string; messages: Array<{ role?: string; content?: string }>; temperature: number; topP: number; maxTokens: number }) {
  const model = args.model.replace(/^models\//, "");
  const contents = buildGeminiContents(args.messages, args.prompt);
  if (!contents) throw new HttpError(400, "messages or prompt is required");

  const payload = {
    contents,
    generationConfig: {
      temperature: args.temperature,
      topP: args.topP,
      maxOutputTokens: args.maxTokens,
    },
  };

  const versions = ["v1beta", "v1"];
  let last: unknown = null;
  for (const version of versions) {
    try {
      const response = await fetchJson(
        `https://generativelanguage.googleapis.com/${version}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(args.apiKey)}`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) },
        "Gemini chat failed",
      );
      const obj = response as Record<string, unknown>;
      return { model: args.model, text: pickGeminiText(response), usage: obj.usageMetadata ?? null };
    } catch (error) {
      last = error;
    }
  }
  if (last instanceof HttpError) throw last;
  throw new HttpError(500, "Gemini chat failed");
}

async function generateTextWithProvider(args: { provider: ProviderId; model: string; apiKey: string; body: Record<string, unknown> }) {
  const model = safeTrim(args.model);
  if (!model) throw new HttpError(400, "Model is required");

  const temperature = typeof args.body.temperature === "number" ? args.body.temperature : 0.7;
  const topP = typeof args.body.top_p === "number" ? args.body.top_p : 0.9;
  const maxTokens = typeof args.body.max_tokens === "number" ? args.body.max_tokens : 1024;
  const prompt = safeTrim(args.body.prompt);
  const messages = Array.isArray(args.body.messages) ? (args.body.messages as Array<{ role?: string; content?: string }>) : [];

  if (args.provider === "gemini") {
    if (isVertexAnthropicModel(model)) {
      const out = await generateWithGemini({ apiKey: args.apiKey, model: "gemini-2.5-flash", prompt, messages, temperature, topP, maxTokens });
      return { model, text: out.text, usage: out.usage };
    }
    return generateWithGemini({ apiKey: args.apiKey, model, prompt, messages, temperature, topP, maxTokens });
  }

  const payload = toOpenAiPayload({ model, messages, prompt, temperature, top_p: topP, max_tokens: maxTokens });
  if (!Array.isArray(payload.messages) || payload.messages.length === 0) throw new HttpError(400, "messages or prompt is required");

  const endpoint = `${providerBaseUrl(args.provider)}/chat/completions`;
  const response = await fetchJson(endpoint, { method: "POST", headers: providerHeaders(args.provider, args.apiKey), body: JSON.stringify(payload) }, "AI chat failed");
  const obj = response as Record<string, unknown>;
  return { model: typeof obj.model === "string" ? obj.model : model, text: pickOpenAiText(response), usage: obj.usage ?? null };
}

async function readStoredKeys(userId: string): Promise<StoredKeys> {
  const { data, error } = await supabaseAdmin.schema(SUPABASE_DB_SCHEMA).from("api_keys_store_v2").select("*").eq("user_id", userId).maybeSingle();
  if (error) throw new HttpError(500, "Failed to read API keys");
  if (!data) return { ...emptyKeys };

  const next = { ...emptyKeys };
  for (const [camel, snake] of Object.entries(keyToDbColumn)) {
    next[camel as keyof StoredKeys] = safeTrim((data as Record<string, unknown>)[snake]);
  }
  return next;
}

async function writeStoredKeys(userId: string, patch: Partial<StoredKeys>) {
  const merged: StoredKeys = { ...(await readStoredKeys(userId)), ...patch };
  const payload: Record<string, unknown> = { user_id: userId };
  for (const [camel, snake] of Object.entries(keyToDbColumn)) {
    payload[snake] = merged[camel as keyof StoredKeys] ?? "";
  }

  const { error } = await supabaseAdmin.schema(SUPABASE_DB_SCHEMA).from("api_keys_store_v2").upsert(payload, { onConflict: "user_id" });
  if (error) throw new HttpError(500, "Failed to save API keys");
  return readStoredKeys(userId);
}

function parseBase64DataUrl(input: string) {
  const text = safeTrim(input);
  const match = text.match(/^data:(.+?);base64,(.+)$/);
  if (!match) throw new HttpError(400, "Invalid base64 image format");
  let bytes: Uint8Array;
  try {
    bytes = Uint8Array.from(atob(match[2]), (c) => c.charCodeAt(0));
  } catch {
    throw new HttpError(400, "Invalid base64 image payload");
  }
  return { mimeType: match[1], bytes };
}

async function handleApi(req: Request) {
  const url = new URL(req.url);
  const path = normalizePath(url.pathname);
  const method = req.method.toUpperCase();

  if (method === "OPTIONS") return new Response("ok", { status: 200, headers: corsHeaders });
  if (!path.startsWith("/api/")) return json({ success: false, error: "Not found" }, 404);

  let body: Record<string, unknown> = {};
  if (method === "POST" || method === "PUT" || method === "PATCH") {
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      body = {};
    }
  }

  const userId = await requireUserId(req);

  if (method === "GET" && path === "/api/settings") {
    const keys = await readStoredKeys(userId);
    return json({ success: true, data: settingsPayload(keys) });
  }

  if (method === "PUT" && path === "/api/settings/api-keys") {
    const patch: Partial<StoredKeys> = {};
    for (const provider of settingsProviders) {
      const field = providerFieldMap[provider];
      const value = safeTrim(body[field]);
      if (value) patch[field] = value;
    }
    if (Object.keys(patch).length === 0) throw new HttpError(400, "At least one API key must be provided");
    const saved = await writeStoredKeys(userId, patch);
    return json({ success: true, message: "API keys updated (Supabase Edge Functions)", data: settingsPayload(saved) });
  }

  if (method === "POST" && path === "/api/settings/api-keys/reveal") {
    const requested = Array.isArray(body.providers) ? body.providers : [];
    const providers = requested.length > 0
      ? requested.filter((p) => isSettingsProviderId(p)) as SettingsProviderId[]
      : settingsProviders;
    const keys = await readStoredKeys(userId);
    const result: Record<string, string | null> = {};
    for (const provider of providers) {
      const field = providerFieldMap[provider];
      result[field] = keys[field] || null;
    }
    return json({ success: true, data: result });
  }

  if (method === "GET" && path === "/api/settings/ai-test/providers") {
    const keys = await readStoredKeys(userId);
    return json({
      success: true,
      data: {
        gemini: { hasKey: !!keys.geminiApiKey },
        openrouter: { hasKey: !!keys.openrouterApiKey },
        groq: { hasKey: !!keys.groqApiKey },
        aimlapi: { hasKey: !!keys.aimlapiApiKey },
        huggingface: { hasKey: !!keys.huggingfaceApiKey },
        pollinations: { hasKey: !!keys.pollinationsApiKey },
        pollo: { hasKey: !!keys.polloApiKey },
        replicate: { hasKey: !!keys.replicateApiKey },
        bfl: { hasKey: !!keys.bflApiKey },
        renderful: { hasKey: !!keys.renderfulApiKey },
        kie: { hasKey: !!keys.kieApiKey },
        fal: { hasKey: !!keys.falApiKey },
      },
    });
  }

  const modelMatch = path.match(/^\/api\/settings\/ai-test\/([^/]+)\/models$/);
  if (method === "GET" && modelMatch) {
    const provider = modelMatch[1];
    if (!isSettingsProviderId(provider) || !modelListProviders.includes(provider)) {
      throw new HttpError(400, "Unsupported provider for models endpoint");
    }

    const keys = await readStoredKeys(userId);
    const apiKey = safeTrim(keys[providerFieldMap[provider]]);
    if (!apiKey) throw new HttpError(400, `Missing API key for ${provider}`);

    if (provider === "huggingface") return json({ success: true, data: { data: huggingFaceImageModels.map((id) => ({ id })) } });
    if (provider === "pollinations") return json({ success: true, data: { data: pollinationsImageModels.map((id) => ({ id })) } });
    if (provider === "pollo") return json({ success: true, data: { data: polloGenerationModels.map((id) => ({ id })) } });
    if (provider === "replicate") return json({ success: true, data: { data: replicateImageModels.map((id) => ({ id })) } });
    if (provider === "bfl") return json({ success: true, data: { data: bflImageModels } });
    if (provider === "renderful") return json({ success: true, data: { data: renderfulImageModels.map((id) => ({ id })) } });
    if (provider === "kie") return json({ success: true, data: { data: kieImageModels.map((id) => ({ id })) } });
    if (provider === "fal") return json({ success: true, data: { data: falImageModels.map((id) => ({ id })) } });

    if (provider === "gemini") {
      const payload = await listGeminiModels(apiKey);
      const models = Array.from(new Set([...normalizeGeminiModelNames(payload), ...vertexAnthropicModels]));
      return json({ success: true, data: { models } });
    }

    const providerId = provider as ProviderId;
    const payload = await fetchJson(
      `${providerBaseUrl(providerId)}/models`,
      { method: "GET", headers: providerHeaders(providerId, apiKey) },
      "Failed to load models",
    );
    return json({ success: true, data: payload });
  }

  if (method === "POST" && path === "/api/settings/ai-test/chat") {
    const provider = body.provider;
    if (!isProviderId(provider) || !allowedProviders.includes(provider)) throw new HttpError(400, "Unsupported provider");
    const model = safeTrim(body.model);
    if (!model) throw new HttpError(400, "Model is required");

    const keys = await readStoredKeys(userId);
    const apiKey = safeTrim(keys[providerFieldMap[provider]]);
    if (!apiKey) throw new HttpError(400, `Missing API key for ${provider}`);

    const startedAt = Date.now();
    const result = await generateTextWithProvider({ provider, model, apiKey, body });

    return json({
      success: true,
      data: {
        provider,
        model: result.model || model,
        text: result.text,
        usage: result.usage ?? undefined,
        latencyMs: Date.now() - startedAt,
      },
    });
  }

  if (method === "POST" && path === "/api/agent/run") {
    const goal = safeTrim(body.goal);
    if (!goal) throw new HttpError(400, "goal is required");
    const model = safeTrim(body.model) || AGENT_DEFAULT_MODEL;
    const context = safeTrim(body.context);

    const keys = await readStoredKeys(userId);
    const apiKey = safeTrim(keys.geminiApiKey);
    if (!apiKey) throw new HttpError(400, "Missing API key for gemini/vertex");

    const startedAt = Date.now();
    const result = await generateTextWithProvider({
      provider: "gemini",
      model,
      apiKey,
      body: {
        messages: [
          {
            role: "user",
            content: [
              "You are an autonomous AI agent. Provide a concise execution plan and result.",
              `Goal: ${goal}`,
              context ? `Context: ${context}` : "",
              "Return useful, actionable output.",
            ].filter(Boolean).join("\n\n"),
          },
        ],
        temperature: 0.3,
        max_tokens: 1200,
      },
    });

    return json({
      success: true,
      data: {
        model,
        goal,
        done: true,
        summary: result.text || "Agent completed.",
        steps: [{ step: 1, thought: "Single-shot response", action: "generate", result: { preview: (result.text || "").slice(0, 500) } }],
        latencyMs: Date.now() - startedAt,
      },
    });
  }

  if (method === "GET" && path === "/api/conversations") {
    const limit = normalizeInt(url.searchParams.get("limit"), 50);
    const offset = normalizeInt(url.searchParams.get("offset"), 0);
    const from = offset;
    const to = offset + Math.max(1, Math.min(limit, 200)) - 1;

    const { data: conversations, error, count } = await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("conversations")
      .select("id,title,provider,model,agent_name,created_at,updated_at", { count: "exact" })
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .range(from, to);
    if (error) throw new HttpError(500, "Failed to load conversations");

    const list = conversations ?? [];
    const ids = list.map((x) => String(x.id));
    const messageCountMap = new Map<string, number>();

    if (ids.length > 0) {
      const { data: rows, error: rowsError } = await supabaseAdmin
        .schema(SUPABASE_DB_SCHEMA)
        .from("messages")
        .select("conversation_id")
        .eq("user_id", userId)
        .in("conversation_id", ids);
      if (rowsError) throw new HttpError(500, "Failed to count conversation messages");
      for (const row of rows ?? []) {
        const key = String((row as Record<string, unknown>).conversation_id ?? "");
        messageCountMap.set(key, (messageCountMap.get(key) ?? 0) + 1);
      }
    }

    return json({
      success: true,
      data: {
        conversations: list.map((item) => ({ ...item, message_count: messageCountMap.get(String(item.id)) ?? 0 })),
        total: count ?? list.length,
        limit,
        offset,
      },
    });
  }

  const conversationMatch = path.match(/^\/api\/conversations\/([^/]+)$/);
  if (method === "GET" && conversationMatch) {
    const conversationId = conversationMatch[1];
    const { data: conversation, error } = await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("conversations")
      .select("*")
      .eq("id", conversationId)
      .eq("user_id", userId)
      .maybeSingle();
    if (error) throw new HttpError(500, "Failed to load conversation");
    if (!conversation) throw new HttpError(404, "Conversation not found");

    const { data: messages, error: msgError } = await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .eq("user_id", userId)
      .order("created_at", { ascending: true });
    if (msgError) throw new HttpError(500, "Failed to load conversation messages");

    return json({ success: true, data: { conversation, messages: messages ?? [] } });
  }

  if (method === "POST" && path === "/api/conversations") {
    const title = safeTrim(body.title);
    const provider = safeTrim(body.provider);
    const model = safeTrim(body.model);
    if (!title || !provider || !model) throw new HttpError(400, "title, provider, and model are required");

    const payload = {
      id: crypto.randomUUID(),
      user_id: userId,
      title,
      provider,
      model,
      system_prompt: safeTrim(body.system_prompt) || null,
      agent_name: safeTrim(body.agent_name) || null,
    };
    const { data, error } = await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("conversations")
      .insert(payload)
      .select("*")
      .single();
    if (error) throw new HttpError(500, "Failed to create conversation");
    return json({ success: true, data }, 201);
  }

  if (method === "PUT" && conversationMatch) {
    const conversationId = conversationMatch[1];
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (typeof body.title === "string") updates.title = safeTrim(body.title);
    if (Object.hasOwn(body, "system_prompt")) updates.system_prompt = safeTrim(body.system_prompt) || null;
    if (Object.hasOwn(body, "agent_name")) updates.agent_name = safeTrim(body.agent_name) || null;
    if (Object.keys(updates).length <= 1) throw new HttpError(400, "No fields to update");

    const { data, error } = await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("conversations")
      .update(updates)
      .eq("id", conversationId)
      .eq("user_id", userId)
      .select("*");
    if (error) throw new HttpError(500, "Failed to update conversation");
    if (!data || data.length === 0) throw new HttpError(404, "Conversation not found");
    return json({ success: true, data: data[0] });
  }

  if (method === "DELETE" && conversationMatch) {
    const conversationId = conversationMatch[1];
    await supabaseAdmin.schema(SUPABASE_DB_SCHEMA).from("messages").delete().eq("conversation_id", conversationId).eq("user_id", userId);
    const { data, error } = await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("conversations")
      .delete()
      .eq("id", conversationId)
      .eq("user_id", userId)
      .select("id");
    if (error) throw new HttpError(500, "Failed to delete conversation");
    if (!data || data.length === 0) throw new HttpError(404, "Conversation not found");
    return json({ success: true, message: "Conversation deleted" });
  }

  if (method === "POST" && path === "/api/messages") {
    const conversationId = safeTrim(body.conversation_id);
    const role = safeTrim(body.role);
    const content = safeTrim(body.content);
    if (!conversationId || !role || !content) throw new HttpError(400, "conversation_id, role, and content are required");
    if (!["user", "assistant", "system"].includes(role)) throw new HttpError(400, "role must be user, assistant, or system");

    const { data: exists, error: existsError } = await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("conversations")
      .select("id")
      .eq("id", conversationId)
      .eq("user_id", userId)
      .maybeSingle();
    if (existsError) throw new HttpError(500, "Failed to validate conversation");
    if (!exists) throw new HttpError(404, "Conversation not found");

    const payload = {
      id: crypto.randomUUID(),
      user_id: userId,
      conversation_id: conversationId,
      role,
      content,
      image_url: safeTrim(body.image_url) || null,
      metadata: typeof body.metadata === "object" && body.metadata ? body.metadata : {},
    };

    const { data, error } = await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("messages")
      .insert(payload)
      .select("*")
      .single();
    if (error) throw new HttpError(500, "Failed to add message");

    await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", conversationId)
      .eq("user_id", userId);

    return json({ success: true, data }, 201);
  }

  if (method === "POST" && path === "/api/upload-image") {
    const conversationId = safeTrim(body.conversation_id);
    const base64Image = safeTrim(body.base64_image);
    const filename = safeTrim(body.filename) || `${Date.now()}.jpg`;
    if (!conversationId || !base64Image) throw new HttpError(400, "conversation_id and base64_image are required");

    const { data: exists } = await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("conversations")
      .select("id")
      .eq("id", conversationId)
      .eq("user_id", userId)
      .maybeSingle();
    if (!exists) throw new HttpError(404, "Conversation not found");

    const parsed = parseBase64DataUrl(base64Image);
    const objectPath = `${SUPABASE_STORAGE_FOLDER}/chat/${userId}/${conversationId}/${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(SUPABASE_STORAGE_BUCKET)
      .upload(objectPath, parsed.bytes, { contentType: parsed.mimeType, upsert: false });
    if (uploadError) throw new HttpError(500, `Upload failed: ${uploadError.message}`);

    const { data: signed, error: signedError } = await supabaseAdmin.storage
      .from(SUPABASE_STORAGE_BUCKET)
      .createSignedUrl(objectPath, 60 * 60 * 24 * 7);
    if (signedError) throw new HttpError(500, `Failed to create signed URL: ${signedError.message}`);

    return json({ success: true, data: { url: signed?.signedUrl ?? null, path: objectPath } });
  }

  const promptMatch = path.match(/^\/api\/prompt-library\/([^/]+)$/);
  if (method === "GET" && path === "/api/prompt-library") {
    const { data, error } = await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("prompt_library_items")
      .select("id,name,description,category,text,starred,created_at,updated_at")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });
    if (error) throw new HttpError(500, "Failed to load prompts");
    return json({ success: true, data: { prompts: data ?? [] } });
  }

  if (method === "POST" && path === "/api/prompt-library") {
    const name = safeTrim(body.name);
    const text = safeTrim(body.text);
    if (!name || !text) throw new HttpError(400, "name and text are required");

    const payload = {
      id: crypto.randomUUID(),
      user_id: userId,
      name,
      description: safeTrim(body.description),
      category: safeTrim(body.category) || "Custom",
      text,
      starred: !!body.starred,
    };

    const { data, error } = await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("prompt_library_items")
      .insert(payload)
      .select("id,name,description,category,text,starred,created_at,updated_at")
      .single();
    if (error) throw new HttpError(500, "Failed to create prompt");
    return json({ success: true, data }, 201);
  }

  if (method === "PUT" && promptMatch) {
    const promptId = promptMatch[1];
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (typeof body.name === "string") updates.name = safeTrim(body.name);
    if (typeof body.description === "string") updates.description = safeTrim(body.description);
    if (typeof body.category === "string") updates.category = safeTrim(body.category) || "Custom";
    if (typeof body.text === "string") updates.text = safeTrim(body.text);
    if (Object.hasOwn(body, "starred")) updates.starred = !!body.starred;
    if (Object.keys(updates).length <= 1) throw new HttpError(400, "No fields to update");

    const { data, error } = await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("prompt_library_items")
      .update(updates)
      .eq("id", promptId)
      .eq("user_id", userId)
      .select("id,name,description,category,text,starred,created_at,updated_at");
    if (error) throw new HttpError(500, "Failed to update prompt");
    if (!data || data.length === 0) throw new HttpError(404, "Prompt not found");
    return json({ success: true, data: data[0] });
  }

  if (method === "DELETE" && promptMatch) {
    const promptId = promptMatch[1];
    const { data, error } = await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("prompt_library_items")
      .delete()
      .eq("id", promptId)
      .eq("user_id", userId)
      .select("id");
    if (error) throw new HttpError(500, "Failed to delete prompt");
    if (!data || data.length === 0) throw new HttpError(404, "Prompt not found");
    return json({ success: true, data: { deleted: true } });
  }

  const agentMatch = path.match(/^\/api\/agents\/([^/]+)$/);
  if (method === "GET" && path === "/api/agents") {
    const { data, error } = await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("agent_profiles")
      .select("id,name,emoji,description,system_prompt,provider,model,temperature,max_tokens,created_at,updated_at")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });
    if (error) throw new HttpError(500, "Failed to load agents");
    return json({ success: true, data: { agents: data ?? [] } });
  }

  if (method === "POST" && path === "/api/agents") {
    const name = safeTrim(body.name);
    const systemPrompt = safeTrim(body.systemPrompt);
    if (!name || !systemPrompt) throw new HttpError(400, "name and systemPrompt are required");

    const payload = {
      id: crypto.randomUUID(),
      user_id: userId,
      name,
      emoji: safeTrim(body.emoji) || "🤖",
      description: safeTrim(body.description),
      system_prompt: systemPrompt,
      provider: safeTrim(body.provider) || "gemini",
      model: safeTrim(body.model),
      temperature: Number.isFinite(Number(body.temperature)) ? Number(body.temperature) : 0.7,
      max_tokens: Number.isInteger(Number(body.maxTokens)) ? Number(body.maxTokens) : 1024,
    };

    const { data, error } = await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("agent_profiles")
      .insert(payload)
      .select("id,name,emoji,description,system_prompt,provider,model,temperature,max_tokens,created_at,updated_at")
      .single();
    if (error) throw new HttpError(500, "Failed to create agent");
    return json({ success: true, data }, 201);
  }

  if (method === "PUT" && agentMatch) {
    const agentId = agentMatch[1];
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (typeof body.name === "string") updates.name = safeTrim(body.name);
    if (typeof body.emoji === "string") updates.emoji = safeTrim(body.emoji) || "🤖";
    if (typeof body.description === "string") updates.description = safeTrim(body.description);
    if (typeof body.systemPrompt === "string") updates.system_prompt = safeTrim(body.systemPrompt);
    if (typeof body.provider === "string") updates.provider = safeTrim(body.provider) || "gemini";
    if (typeof body.model === "string") updates.model = safeTrim(body.model);
    if (Object.hasOwn(body, "temperature")) updates.temperature = Number.isFinite(Number(body.temperature)) ? Number(body.temperature) : 0.7;
    if (Object.hasOwn(body, "maxTokens")) updates.max_tokens = Number.isInteger(Number(body.maxTokens)) ? Number(body.maxTokens) : 1024;
    if (Object.keys(updates).length <= 1) throw new HttpError(400, "No fields to update");

    const { data, error } = await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("agent_profiles")
      .update(updates)
      .eq("id", agentId)
      .eq("user_id", userId)
      .select("id,name,emoji,description,system_prompt,provider,model,temperature,max_tokens,created_at,updated_at");
    if (error) throw new HttpError(500, "Failed to update agent");
    if (!data || data.length === 0) throw new HttpError(404, "Agent not found");
    return json({ success: true, data: data[0] });
  }

  if (method === "DELETE" && agentMatch) {
    const agentId = agentMatch[1];
    const { data, error } = await supabaseAdmin
      .schema(SUPABASE_DB_SCHEMA)
      .from("agent_profiles")
      .delete()
      .eq("id", agentId)
      .eq("user_id", userId)
      .select("id");
    if (error) throw new HttpError(500, "Failed to delete agent");
    if (!data || data.length === 0) throw new HttpError(404, "Agent not found");
    return json({ success: true, data: { deleted: true } });
  }

  return json({ success: false, error: `Endpoint not implemented: ${method} ${path}` }, 404);
}

Deno.serve(async (req) => {
  try {
    return await handleApi(req);
  } catch (error) {
    if (error instanceof HttpError) return json({ success: false, error: error.message }, error.status);
    console.error("[ezyai-api] unhandled", error);
    return json({ success: false, error: "Internal server error" }, 500);
  }
});
