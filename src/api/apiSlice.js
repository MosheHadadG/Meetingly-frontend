import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../Constants";

const baseQuery = fetchBaseQuery({
  baseUrl: config.url.API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  keepUnusedDataFor: 60 * 60,
  tagTypes: [
    "Events",
    "Event",
    "EventsUserLoggedInCreate",
    "User",
    "Profile",
    "Requests",
    "Favorite",
    "NotificationsCounter",
    "Chats",
    "ChatsCounter",
  ],
  endpoints: (builder) => ({}),
});
