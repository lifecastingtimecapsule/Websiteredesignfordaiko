import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-249c283c`;

interface FetchOptions extends RequestInit {
  token?: string;
}

async function apiFetch(endpoint: string, options: FetchOptions = {}) {
  const { token, ...fetchOptions } = options;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : `Bearer ${publicAnonKey}`,
    ...fetchOptions.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}

export const newsApi = {
  // Public endpoints
  getAll: () => apiFetch('/news'),
  getById: (id: string) => apiFetch(`/news/${id}`),

  // Staff endpoints
  staff: {
    getAll: (token: string) => apiFetch('/staff/news', { token }),
    create: (token: string, data: { title: string; content: string; category: string }) =>
      apiFetch('/staff/news', {
        method: 'POST',
        body: JSON.stringify(data),
        token,
      }),
    update: (token: string, id: string, data: Partial<{ title: string; content: string; category: string; published: boolean }>) =>
      apiFetch(`/staff/news/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        token,
      }),
    delete: (token: string, id: string) =>
      apiFetch(`/staff/news/${id}`, {
        method: 'DELETE',
        token,
      }),
  },
};

export const staffApi = {
  signup: (data: { email: string; password: string; name: string }) =>
    apiFetch('/staff/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
