function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// random 43–128 char verifier
export function generateCodeVerifier(length = 64): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const values = new Uint8Array(length);
  crypto.getRandomValues(values);
  let out = "";
  values.forEach((v) => (out += charset[v % charset.length]));
  return out;
}

// code_challenge = BASE64URL(SHA256(verifier))
export async function generateCodeChallenge(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(new Uint8Array(digest));
}

// random URL-safe state for CSRF protection
export function generateState(length = 32): string {
  const values = new Uint8Array(length);
  crypto.getRandomValues(values);
  return base64UrlEncode(values);
}