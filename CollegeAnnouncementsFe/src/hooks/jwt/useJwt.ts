import { JWTHeader, keyList } from "./jwt.types";

export const useJwt = () => {
  async function verifyAndDecodeJwe(token: string, keys: keyList) {
    const [encodedHeader, encodedPayload, signature] = token.split(".");

    const decodedHeader: JWTHeader = JSON.parse(atob(encodedHeader));
    const decodedPayload: object = JSON.parse(atob(encodedPayload));

    const publicKey = keys.find((key) => key.kid === decodedHeader.kid);

    if (!publicKey) {
      throw new Error("Public key not found for the given Key ID (kid)");
    }

    return decodedPayload;
  }

  return { verifyAndDecodeJwe };
};
