import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

import logout from "./logout";
import { ADMIN_BASE_URL } from "./BaseUrl";
import { getCookie } from "../utils/cookies";

// Single, shared instance — created once
const api: AxiosInstance = axios.create({
  baseURL: ADMIN_BASE_URL,
  timeout: 15000,
});

// Attach token to every request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const isLoginCall = config.url?.includes("/auth/login");
  const token = isLoginCall
    ? getCookie("signUp_token")
    : getCookie("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

// Handle auth failures globally
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const status = error.response?.status;
    const currentPath = window.location.pathname;
    const isVerifyPage = currentPath === "/auth/verify";

    if ((status === 401 || status === 403) && !isVerifyPage) {
      logout();
    }
    return Promise.reject(error);
  },
);

// Typed generic request helper
export type RequestOptions<TBody = unknown> = {
  url: string;
  method?: AxiosRequestConfig["method"];
  params?: Record<string, unknown>;
  data?: TBody;
  headers?: Record<string, string>;
};

export const request = <TResponse, TBody = unknown>(
  options: RequestOptions<TBody>,
): Promise<AxiosResponse<TResponse>> => {
  return api.request<TResponse>(options);
};

export default api;
