import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import envConfig from "../config/envConfig";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${envConfig.backendUrl}/auth` }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/sign-in",
        method: "POST",
        body: { email, password },
      }),
    }),
    signUp: builder.mutation({
      query: ({ email, password, firstName, lastName, confirmPassword }) => ({
        url: "/sign-up",
        method: "POST",
        body: { email, password, firstName, lastName, confirmPassword },
      }),
    }),
    logout: builder.mutation({
      query: ({ accessToken }) => ({
        url: "/logout",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useSignUpMutation } =
  authApi;
