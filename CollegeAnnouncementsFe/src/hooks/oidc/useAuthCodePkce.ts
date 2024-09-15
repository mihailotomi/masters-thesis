import { pkceConfig } from "./oidc.types";

export function useAuthCodePkce(configuration: pkceConfig) {
  const { redirectUrl, clientId, authorizationUrl } = configuration;

  const base64URLEncode = (buffer: number[] | Uint8Array) => {
    return btoa(String.fromCharCode.apply(null, Array.from(buffer)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  };

  const generateRandomValues = (length: number) => {
    const values = new Uint8Array(length);
    crypto.getRandomValues(values);
    return Array.from(values);
  };

  const generateCodeVerifier = () => {
    return base64URLEncode(generateRandomValues(64));
  };

  const deriveCodeChallenge = async (codeVerifier: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const buffer = await crypto.subtle.digest("SHA-256", data);

    return base64URLEncode(new Uint8Array(buffer));
  };

  const getAuthorizationUrl: () => Promise<string> = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await deriveCodeChallenge(codeVerifier);

    sessionStorage.setItem("codeVerifier", codeVerifier);

    const authorizationParams = new URLSearchParams();
    authorizationParams.append("client_id", clientId);
    authorizationParams.append("redirect_uri", redirectUrl);
    authorizationParams.append("response_type", "code");
    authorizationParams.append("scope", "openid profile email urn:iam:org:project:roles");
    authorizationParams.append("code_challenge", codeChallenge);
    authorizationParams.append("code_challenge_method", "S256");
    authorizationParams.append("prompt", "login");

    return `${authorizationUrl}?${authorizationParams.toString()}`;
  };

  const getTokenUrl = (authorizationCode: string): string => {
    const codeVerifier = sessionStorage.getItem("codeVerifier");

    if (!codeVerifier) {
      throw new Error("Code verifier not found in session storage");
    }

    const tokenParams = new URLSearchParams();
    tokenParams.append("grant_type", "authorization_code");
    tokenParams.append("client_id", clientId);
    tokenParams.append("code", authorizationCode);
    tokenParams.append("redirect_uri", redirectUrl);
    tokenParams.append("code_verifier", codeVerifier);

    return `${authorizationUrl.replace("authorize", "token")}?${tokenParams.toString()}`;
  };


  return { getAuthorizationUrl, getTokenUrl };
}
