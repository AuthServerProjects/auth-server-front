export const getCookie = (key: string): string | null => {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${encodeURIComponent(key)}=`));

  if (!match) return null;
  return decodeURIComponent(match.slice(match.indexOf("=") + 1));
};

export const clearCookieByName = (
  cookieName: string,
  options: { path?: string; domain?: string } = {},
) => {
  const { path = "/", domain } = options;
  const parts = [
    `${encodeURIComponent(cookieName)}=`,
    "expires=Thu, 01 Jan 1970 00:00:00 GMT",
    `path=${path}`,
  ];
  if (domain) parts.push(`domain=${domain}`);
  document.cookie = parts.join("; ");
};

export const setCookie = (
  key: string,
  value: string,
  options: {
    days?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
  } = {},
) => {
  const { days, path = "/", domain, secure, sameSite = "Lax" } = options;

  const parts = [
    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    `path=${path}`,
    `SameSite=${sameSite}`,
  ];

  if (days !== undefined) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    parts.push(`expires=${expires.toUTCString()}`);
  }
  if (domain) parts.push(`domain=${domain}`);
  if (secure || sameSite === "None") parts.push("Secure");

  document.cookie = parts.join("; ");
};
