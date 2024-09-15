export type keyList = {
  kid: string;
  n: string;
  alg: string;
}[];

export interface JWTHeader {
  alg: string;
  typ: string;
  kid: string;
}
