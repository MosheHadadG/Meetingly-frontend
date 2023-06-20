import { apiSlice } from "../../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    loadUser: builder.query({
      query: () => "user/load-user",
      providesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (registerForm) => ({
        url: "user/create-user",
        method: "POST",
        body: { ...registerForm },
      }),
    }),
    uploadAvatar: builder.mutation({
      query: (formData) => ({
        url: "user/upload-avatar",
        method: "POST",
        body: formData,
      }),
    }),
    deleteAvatarImg: builder.mutation({
      query: (fileName) => ({
        url: "user/delete-avatar-img",
        method: "POST",
        body: { ...fileName },
      }),
    }),
    userVerifyOtp: builder.mutation({
      query: (otpCode) => ({
        url: "user/verify-otp",
        method: "POST",
        body: { ...otpCode },
      }),
    }),
    getUserByUsername: builder.query({
      query: (username) => `user/specific-user/?username=${username}`,
      providesTags: ["Profile"],
    }),

    updateUser: builder.mutation({
      query: (updatedUser) => ({
        url: "user/update-user",
        method: "PUT",
        body: { ...updatedUser },
      }),
      invalidatesTags: ["Events", "User", "Profile"],
    }),
    getEventsUserParticipate: builder.query({
      query: () => "user/events-user-participate",
      providesTags: ["Event"],
    }),

    // EventsRequests
    getUserEventsRequests: builder.query({
      query: ({ page }) => `user/events-requests?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (newItems.status === "NoFound" && !newItems.eventsRequests) {
          currentCache.status = newItems.status;
          currentCache.statusMessage = newItems.statusMessage;
        } else if (newItems?.currentPage === 1) {
          currentCache.eventsRequests = [];
          currentCache.eventsRequests.push(...newItems.eventsRequests);
          currentCache.currentPage = newItems.currentPage;
          currentCache.numberOfPages = newItems.numberOfPages;
          currentCache.totalEventsRequests = newItems.totalEventsRequests;
          currentCache.status = newItems.status;
          delete currentCache.statusMessage;
          console.log(currentCache.totalEventsRequests);
        } else {
          currentCache.eventsRequests.push(...newItems.eventsRequests);
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg, endpointState }) {
        let numberOfPages = endpointState?.data.numberOfPages;
        let noFoundEventsRequests = endpointState?.data.status === "NoFound";

        if (!numberOfPages && !noFoundEventsRequests) return true;
        return currentArg.page <= numberOfPages && currentArg.page !== previousArg.page;
      },
    }),

    eventRequestUserDecision: builder.mutation({
      query: (userDecisionData) => ({
        url: "user/user-event-request",
        method: "PATCH",
        body: { ...userDecisionData },
      }),
      invalidatesTags: ["NotificationsCounter"],
    }),

    // Favorites
    addEventToFavorites: builder.mutation({
      query: (eventId) => ({
        url: "user/add-event-to-favorites",
        method: "PATCH",
        body: { ...eventId },
      }),
      invalidatesTags: ["User", "Favorite"],
    }),
    removeEventFromFavorites: builder.mutation({
      query: (eventId) => ({
        url: "user/remove-event-from-favorites",
        method: "PATCH",
        body: { ...eventId },
      }),
      invalidatesTags: ["User", "Favorite"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLoadUserQuery,
  useCreateUserMutation,
  useUploadAvatarMutation,
  useDeleteAvatarImgMutation,
  useUserVerifyOtpMutation,
  useGetUserByUsernameQuery,
  useUpdateUserMutation,
  useGetEventsUserParticipateQuery,
  useGetUserEventsRequestsQuery,
  useEventRequestUserDecisionMutation,
  useAddEventToFavoritesMutation,
  useRemoveEventFromFavoritesMutation,
} = authApiSlice;
