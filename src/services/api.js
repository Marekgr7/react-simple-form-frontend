import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (builder) => ({
    bookEvent: builder.mutation({
      query: (data) => ({
        url: "booked-events",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useBookEventMutation } = api;
