export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  id_token?: string;
  expires_in?: number;
  refresh_expires_in?: number;
  token_type?: string;
  scope?: string;
};

const STORAGE_KEY = 'meucaixa_tokens';

const KEYCLOAK_TOKEN_URL = 'http://localhost:8080/realms/meucaixa/protocol/openid-connect/token';
const CLIENT_ID = 'meucaixa-web';
const CLIENT_SECRET = 'EUNE1wElqGgAfgmjZN7Y7rQA6zafA75S';

function saveTokens(tokens: TokenResponse) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
}

function loadTokens(): TokenResponse | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function login(username: string, password: string): Promise<TokenResponse> {
  const body = new URLSearchParams();
  body.set('client_id', CLIENT_ID);
  body.set('client_secret', CLIENT_SECRET);
  body.set('grant_type', 'password');
  body.set('username', username);
  body.set('password', password);
  body.set('scope', 'openid');

  const res = await fetch(KEYCLOAK_TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Login failed: ${res.status} ${text}`);
  }

  const tokens = await res.json() as TokenResponse;
  saveTokens(tokens);
  return tokens;
}

export async function refreshTokens(): Promise<TokenResponse> {
  const tokens = loadTokens();
  if (!tokens?.refresh_token) throw new Error('No refresh token available');

  const body = new URLSearchParams();
  body.set('client_id', CLIENT_ID);
  body.set('client_secret', CLIENT_SECRET);
  body.set('grant_type', 'refresh_token');
  body.set('refresh_token', tokens.refresh_token);

  const res = await fetch(KEYCLOAK_TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Refresh failed: ${res.status} ${text}`);
  }

  const newTokens = await res.json() as TokenResponse;
  saveTokens(newTokens);
  return newTokens;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getTokens(): TokenResponse | null {
  return loadTokens();
}

export function isAuthenticated() {
  return !!loadTokens()?.access_token;
}

// very small JWT decoder to extract payload (no verification)
export function decodeJwtPayload(token?: string) {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch {
    return null;
  }
}

