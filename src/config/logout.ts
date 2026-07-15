// import { clearCookieByName } from "../utils/cookies";

// export default function logout() {
//   localStorage.clear();
//   sessionStorage.clear();
//   // clearAllCookies();
//   clearCookieByName("access_token");
//   window.location.href = "/";
// }

import api from "./axios";
import { API_BASE_URL } from "./BaseUrl";
import { clearCookieByName } from "../utils/cookies";

// Keys we manage explicitly — safer than nuking everything
const AUTH_STORAGE_KEYS = ["access_token", "user"];
const AUTH_COOKIE_NAMES = ["access_token", "refresh_token", "signUp_token"];

let isLoggingOut = false;

type LogoutOptions = {
  /** Call the server /logout endpoint. Set false when logout is triggered by a 401. */
  callServer?: boolean;
  /** Where to send the user after cleanup. */
  redirectTo?: string;
};

export default async function logout({
  callServer = true,
  redirectTo = "/login",
}: LogoutOptions = {}) {
  // Prevent re-entry (e.g., interceptor loops)
  if (isLoggingOut) return;
  isLoggingOut = true;

  try {
    if (callServer) {
      // Fire-and-forget; don't block the user if the server is down
      try {
        await api.post(`${API_BASE_URL}/logout`);
      } catch {
        // Server logout failed — proceed with client-side cleanup anyway
      }
    }
  } finally {
    // Clear known storage keys (keep theme, language, etc.)
    AUTH_STORAGE_KEYS.forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });

    // Clear known cookies
    AUTH_COOKIE_NAMES.forEach((name) => clearCookieByName(name));

    // Full reload — resets React state, React Query cache, everything
    window.location.href = redirectTo;
  }
}
