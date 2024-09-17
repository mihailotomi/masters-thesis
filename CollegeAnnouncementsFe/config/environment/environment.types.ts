export interface Environment {
  mode: AppModeType;
  api: string;
  oidc: {
    clientId: string;
    issuerEndpoint: string;
    loginCallbackUrl: string;
    authorizationEndpoint: string;
    keyListEndpoint: string;
    userInfoEndpoint: string;
    roleFieldName: string;
    endSessionEndpoint: string;
  };
}

export enum AppModeType {
  dev = "development",
  staging = "staging",
}
