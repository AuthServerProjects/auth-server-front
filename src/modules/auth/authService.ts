import type {
  SendOtpRequest,
  VerifyOtpRequest,
  VerifyOtpResponse,
  TokenResponse,
} from "./authTypes";
import axios from "axios";
import api from "../../config/axios";
import { API_BASE_URL } from "../../config/BaseUrl";
import type { Response } from "../../utils/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const authService = {
  // POST {API_PREFIX}/otp/send
  sendOtp: async (request: SendOtpRequest): Promise<string> => {
    const { data } = await api.post<Response<string>>(
      `${API_BASE_URL}/otp/send`,
      request,
    );
    return data.responses;
  },

  // POST {API_PREFIX}/otp/verify
  verifyOtp: async (request: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    const { data } = await api.post<Response<VerifyOtpResponse>>(
      `${API_BASE_URL}/otp/verify`,
      request,
    );
    return data.responses;
  },

  // POST /oauth2/token
  exchangeToken: async (params: {
    code: string;
    redirectUri: string;
    clientId: string;
    codeVerifier: string;
  }): Promise<TokenResponse> => {
    const body = new URLSearchParams();
    body.set("grant_type", "authorization_code");
    body.set("code", params.code);
    body.set("redirect_uri", params.redirectUri);
    body.set("client_id", params.clientId);
    body.set("code_verifier", params.codeVerifier);

    // plain axios (not `api`) — no Bearer/admin baseURL/interceptors here
    const { data } = await axios.post<TokenResponse>(
      `${BASE_URL}/oauth2/token`,
      body,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );
    return data;
  },
};
