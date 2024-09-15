import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { KeyListResponse,TokenResponse } from "./authApi.types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  endpoints: (builder) => ({
    getUserToken: builder.mutation<TokenResponse, string>({
      query(tokenUri) {
        return {
          url: tokenUri,
          method: "POST",
        };
      },
    }),

    getKeyList: builder.mutation<KeyListResponse, string>({
      query(keyListUri) {
        return {
          url: keyListUri,
          method: "POST",
        };
      },
    }),

   
  }),
});

export const { useGetUserTokenMutation, useGetKeyListMutation } = authApi;
