export interface pkceConfig {
  redirectUrl: string;
  clientId: string;
  authorizationUrl: string;
}

export interface rpLogoutConfig {
  logoutEndpoint: string;
  postlogoutUrl: string;
  id_token: string;
}