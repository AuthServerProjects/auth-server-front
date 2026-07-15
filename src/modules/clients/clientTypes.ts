export const CLIENT_AUTHENTICATION_METHODS = [
  "CLIENT_SECRET_BASIC",
  "CLIENT_SECRET_POST",
  "CLIENT_SECRET_JWT",
  "PRIVATE_KEY_JWT",
  "NONE",
] as const;

export const AUTHORIZATION_GRANT_TYPES = [
  "AUTHORIZATION_CODE",
  "REFRESH_TOKEN",
  "CLIENT_CREDENTIALS",
  "PASSWORD",
  "DEVICE_CODE",
] as const;

export const SCOPES = [
  "OPENID",
  "PROFILE",
  "EMAIL",
  "ADDRESS",
  "PHONE",
] as const;

export type ClientAuthenticationMethod =
  (typeof CLIENT_AUTHENTICATION_METHODS)[number];
export type AuthorizationGrantType = (typeof AUTHORIZATION_GRANT_TYPES)[number];
export type Scope = (typeof SCOPES)[number];

export type ClientSetting = {
  id: number;
  requireProofKey: boolean;
  requireAuthorizationConsent: boolean;
  accessTokenTimeToLive: number;
  x509CertificateBoundAccessTokens: boolean;
  refreshTokenTimeToLive: number;
  reuseRefreshTokens: boolean;
  idTokenSignatureAlgorithm: string;
  authorizationCodeTimeToLive: number;
  deviceCodeTimeToLive: number;
};

export type Client = {
  id: number;
  registeredClientId: string;
  clientId: string;
  clientAuthenticationMethods: ClientAuthenticationMethod[];
  authorizationGrantTypes: AuthorizationGrantType[];
  redirectUris: string[];
  scopes: Scope[];
  isEnabled: boolean;
  setting: ClientSetting;
};

export type ClientDropdown = {
  clientId: number; // DB id
  clientName: string;
};
