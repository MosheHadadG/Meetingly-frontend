import { apiSlice } from "../../../api/apiSlice";

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Notifications
    getUserNotifications: builder.query({
      query: ({ page }) => `user/notifications?page=${page}`,
      // Only have one cache entry because the arg always maps to one string

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        if (newItems.status === "NoFound" && !newItems.notifications) {
          currentCache.status = newItems.status;
          currentCache.statusMessage = newItems.statusMessage;
        } else if (newItems?.currentPage === 1) {
          currentCache.notifications = [];
          currentCache.notifications.push(...newItems.notifications);
          currentCache.currentPage = newItems.currentPage;
          currentCache.numberOfPages = newItems.numberOfPages;
          currentCache.status = newItems.status;
          delete currentCache.statusMessage;
        } else {
          currentCache.notifications.push(...newItems.notifications);
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg, endpointState }) {
        let numberOfPages = endpointState?.data.numberOfPages;
        let noFoundNotifications = endpointState?.data.status === "NoFound";
        // console.log({ currentArg, previousArg, endpointState, numberOfPages });
        if (!numberOfPages && !noFoundNotifications) return true;
        return currentArg.page <= numberOfPages && currentArg.page !== previousArg.page;
      },
    }),

    getNumberNotificationsEventsRequests: builder.query({
      query: () => "user/number-notifications-events-requests",
      providesTags: ["NotificationsCounter"],
    }),

    markAsReadAllNotifications: builder.mutation({
      query: () => ({
        url: "user/notifications/mark-as-read-all",
        method: "POST",
      }),
      invalidatesTags: ["NotificationsCounter"],
    }),

    markAsReadNotification: builder.mutation({
      query: (notificationId) => ({
        url: "user/notifications/mark-as-read",
        method: "PATCH",
        body: { notificationId },
      }),
      invalidatesTags: ["NotificationsCounter"],
    }),

    deleteNotificationById: builder.mutation({
      query: (notificationId) => ({
        url: "user/notifications/delete-notification",
        method: "DELETE",
        body: { notificationId },
      }),
      invalidatesTags: ["NotificationsCounter"],
    }),
  }),
});

export const {
  useGetUserNotificationsQuery,
  useGetNumberNotificationsEventsRequestsQuery,
  useMarkAsReadAllNotificationsMutation,
  useMarkAsReadNotificationMutation,
  useDeleteNotificationByIdMutation,
} = notificationsApiSlice;
