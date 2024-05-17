import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import envConfig from "../config/envConfig";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${envConfig.backendUrl}/users` }),
  endpoints: (builder) => ({
    userInfo: builder.query({
      query: ({ accessToken }) => ({
        url: "/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const { useUserInfoQuery, useLazyUserInfoQuery } = userApi;
