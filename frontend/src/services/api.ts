import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { supabase } from '../lib/supabase';
import { emitDataSync, mapApiChangeToTopics } from '../lib/dataSync';

const configuredApiUrl = (import.meta.env.VITE_API_URL || '').trim();
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabasePublishableKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined)
  ?? (import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string | undefined)
  ?? '';
const edgeFunctionName = (import.meta.env.VITE_SUPABASE_FUNCTION_NAME || 'ezyai-api').trim();
const runtimeOrigin = typeof window !== 'undefined' ? window.location.origin : '';
const localFallbackConfig = (import.meta.env.VITE_LOCAL_API_FALLBACKS || '').trim();
const functionBaseUrl = supabaseUrl
  ? `${supabaseUrl.replace(/\/+$/, '')}/functions/v1/${edgeFunctionName || 'ezyai-api'}`
  : '';

const localFallbackBases = (() => {
  if (typeof window === 'undefined') return [] as string[];
  const host = window.location.hostname;
  if (host !== 'localhost' && host !== '127.0.0.1') return [] as string[];

  const defaults = [
    'http://localhost:4300/api',
    'http://localhost:4302/api',
    'http://localhost:4306/api',
    'http://localhost:4301/api',
    'http://localhost:4303/api'
  ];
  const configured = localFallbackConfig
    ? localFallbackConfig.split(',').map((value: string) => value.trim()).filter(Boolean)
    : [];

  return Array.from(new Set([...configured, ...defaults]));
})();

const api: AxiosInstance = axios.create({
  // Prefer Supabase Edge Functions for serverless BaaS.
  baseURL: configuredApiUrl || functionBaseUrl || runtimeOrigin || undefined,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.headers.Authorization) {
    delete config.headers.Authorization;
  }
  if (supabasePublishableKey) {
    config.headers.apikey = supabasePublishableKey;
  }

  return config;
});

type RetryableAxiosConfig = AxiosRequestConfig & { __localFallbackTried?: boolean };

async function tryLocalFallback(error: any) {
  const originalConfig = (error?.config || {}) as RetryableAxiosConfig;
  if (originalConfig.__localFallbackTried || localFallbackBases.length === 0) {
    return null;
  }

  const currentBase = String(originalConfig.baseURL || api.defaults.baseURL || '');
  const candidates = localFallbackBases.filter((base) => base && base !== currentBase);

  for (const candidate of candidates) {
    try {
      const retryConfig: RetryableAxiosConfig = {
        ...originalConfig,
        baseURL: candidate,
        __localFallbackTried: true
      };
      const response = await api.request(retryConfig);
      api.defaults.baseURL = candidate;
      return response;
    } catch (retryError) {
      if (axios.isAxiosError(retryError) && retryError.response) {
        throw retryError;
      }
    }
  }

  return null;
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error)) {
      const serverMessage = (error.response?.data as { error?: string; message?: string } | undefined)?.error
        || (error.response?.data as { error?: string; message?: string } | undefined)?.message;
      const requestBase = String(error.config?.baseURL || api.defaults.baseURL || '');
      const isFunctionBase = requestBase.includes('/functions/v1/');
      const isFunction404 = isFunctionBase && error.response?.status === 404;

      if (!error.response || isFunction404) {
        const fallbackResponse = await tryLocalFallback(error);
        if (fallbackResponse) {
          return fallbackResponse;
        }
      }

      if (serverMessage) {
        return Promise.reject(new Error(serverMessage));
      }

      if (!error.response) {
        const endpointHint = configuredApiUrl || functionBaseUrl || `${runtimeOrigin}/api`;
        return Promise.reject(
          new Error(`เชื่อมต่อ API ไม่ได้ (ตรวจสอบ Supabase Functions/API URL: ${endpointHint} และเช็กว่า deploy function แล้ว)`)
        );
      }
    }

    return Promise.reject(error);
  }
);

export async function get<T>(url: string, config?: AxiosRequestConfig) {
  const response = await api.get<T>(url, config);
  return response.data;
}

export async function post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  const response = await api.post<T>(url, data, config);
  const topics = mapApiChangeToTopics('POST', url);
  if (topics.length > 0) {
    emitDataSync(topics, 'api', `POST ${url}`);
  }
  return response.data;
}

export async function put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  const response = await api.put<T>(url, data, config);
  const topics = mapApiChangeToTopics('PUT', url);
  if (topics.length > 0) {
    emitDataSync(topics, 'api', `PUT ${url}`);
  }
  return response.data;
}

export async function del<T>(url: string, config?: AxiosRequestConfig) {
  const response = await api.delete<T>(url, config);
  const topics = mapApiChangeToTopics('DELETE', url);
  if (topics.length > 0) {
    emitDataSync(topics, 'api', `DELETE ${url}`);
  }
  return response.data;
}

export default api;
