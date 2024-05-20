import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import envConfig from "../config/envConfig";
import { IMessageObject } from "../types/messages.types";

export const messageApi = createApi({
  reducerPath: "messagApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${envConfig.backendUrl}/messages` }),
  endpoints: (builder) => ({
    getMessages: builder.query<IMessageObject[], any>({
      query: ({ accessToken, withResponse }) => ({
        url: "/",
        method: "GET",
        params: { withResponse },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useLazyGetMessagesQuery } = messageApi;
