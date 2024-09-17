import { AppModeType, Environment } from "./environment.types";

export const stagingEnv: Environment = {
  mode: AppModeType.dev,
  oidc: {
    clientId: "285068258355249156@college",
    issuerEndpoint: "http://localhost:8081",
    loginCallbackUrl: "http://localhost:5173/code",
    authorizationEndpoint: "http://localhost:8081/oauth/v2/authorize",
    keyListEndpoint: "http://localhost:8081/oauth/v2/keys",
    userInfoEndpoint: "http://localhost:8081/oidc/v1/userinfo",
    roleFieldName: "urn:zitadel:iam:org:project:284943849644621828:roles",
    endSessionEndpoint: "http://localhost:8081/oidc/v1/end_session",
  },
};
