const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PREFIX = import.meta.env.VITE_API_PREFIX;
const URL_PREFIX = import.meta.env.VITE_URL_PREFIX;
const ADMIN_PREFIX = import.meta.env.VITE_ADMIN_PREFIX;

export const API_BASE_URL = `${BASE_URL}${API_PREFIX}`;
export const AUTH_BASE_URL = `${BASE_URL}${URL_PREFIX}`;
export const ADMIN_BASE_URL = `${BASE_URL}${ADMIN_PREFIX}`;
