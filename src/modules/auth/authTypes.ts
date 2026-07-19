export type SendOtpRequest = {
  phoneNumber: string;
  state: string;
  clientId: string;
  redirectUri?: string;
  codeChallenge?: string;
  codeChallengeMethod?: "S256" | "plain";
  scope?: string;
};

export type VerifyOtpRequest = {
  phoneNumber: string;
  otp: string;
  state: string;
};

// backend VerifyOtpResponseDto
export type VerifyOtpResponse = {
  state: string;
  redirectUri: string;
  authorizationCode: string;
  phoneNumber: string;
};

// /oauth2/token response (standard OAuth2)
export type TokenResponse = {
  access_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
};
