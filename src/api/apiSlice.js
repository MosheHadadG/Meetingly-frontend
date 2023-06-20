import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../redux/slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/",
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
  ],
  endpoints: (builder) => ({}),
});
