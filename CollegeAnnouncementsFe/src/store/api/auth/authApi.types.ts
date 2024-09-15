import type { User } from "@entities";
import { keyList } from "@hooks";

export type LoginPayload = {
  userName: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type GetMePayload = {
  id: number;
  token: string;
};

export interface TokenResponse {
  id_token: string;
  access_token: string;
}

export interface KeyListResponse {
  keys: keyList;
}

export type GetMeResponse = Omit<User, "token" | "permissions" | "config">;
