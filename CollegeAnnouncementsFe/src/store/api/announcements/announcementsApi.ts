import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../config/storeConfig";
import config from "@config";
import { Announcement } from "@entities";

export interface AnnouncementsResponse {
  totalCount: number;
  page: number;
  pageSize: number;
  announcements: Announcement[];
}

export const announcementsApi = createApi({
  reducerPath: "announcementsApi",
  tagTypes: ["Announcements"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.environment.api}`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.currentUser?.token || "";

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAnnouncements: builder.query<AnnouncementsResponse, { page?: number; pageSize?: number }>({
      query: ({ page = 1, pageSize = 12 }) => ({
        url: `announcements`,
        params: { page, pageSize },
      }),
      providesTags: ["Announcements"],
    }),
  }),
});

export const { useGetAnnouncementsQuery } = announcementsApi;