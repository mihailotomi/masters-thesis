import { rpLogoutConfig } from "./oidc.types";

export const useRpLogout = () => {
  const getLogoutUrl = ({ id_token, logoutEndpoint, postlogoutUrl }: rpLogoutConfig) => {
    const logoutParams = new URLSearchParams();
    logoutParams.append("id_token_hint", id_token);
    logoutParams.append("post_logout_redirect_uri", postlogoutUrl);
    return `${logoutEndpoint}?${logoutParams.toString()}`;
  };

  return { getLogoutUrl };
};
