import { apiSlice } from "../../../api/apiSlice";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEventsByType: builder.query({
      query: () => `/events/events-by-type/`,
      providesTags: ["Events"],
    }),

    getEventById: builder.query({
      query: (eventId) => `/events/specific-event/?eventId=${eventId}`,
      providesTags: ["Event"],
    }),

    getEventsByOwnerId: builder.query({
      query: (ownerId) => `/events/events-by-owner/?ownerId=${ownerId}`,
      providesTags: ["EventsUserLoggedInCreate"],
    }),
    getEventsUserParticipated: builder.query({
      query: (userId) => `events/events-user-participated/?userId=${userId}`,
    }),
    createEvent: builder.mutation({
      query: (createEventForm) => ({
        url: "events/create-event",
        method: "POST",
        body: { ...createEventForm },
      }),
      invalidatesTags: ["Events"],
    }),
    uploadEventCoverImg: builder.mutation({
      query: (formData) => ({
        url: "events/upload-event-cover",
        method: "POST",
        body: formData,
      }),
    }),
    deleteEventCoverImg: builder.mutation({
      query: (fileName) => ({
        url: "events/delete-event-cover",
        method: "POST",
        body: { ...fileName },
      }),
    }),
    updateEvent: builder.mutation({
      query: (eventUpdatedFormData) => ({
        url: `events/update-event`,
        method: "POST",
        body: { ...eventUpdatedFormData },
      }),
      invalidatesTags: ["Event", "EventsUserLoggedInCreate"],
    }),
    updateEventParticipants: builder.mutation({
      query: (participantsUpdated) => ({
        url: `events/update-event-participants`,
        method: "POST",
        body: { ...participantsUpdated },
      }),
      invalidatesTags: ["Event", "EventsUserLoggedInCreate"],
    }),
    getParticipantsById: builder.query({
      query: (participantsIds) =>
        `events/participants/?participantsIds=${participantsIds.join(";")}`,
    }),
    userJoinToEvent: builder.mutation({
      query: (eventId) => ({
        url: "events/join-event",
        method: "PATCH",
        body: { ...eventId },
      }),
      invalidatesTags: ["Event", "User"],
    }),
    userCancelParticipation: builder.mutation({
      query: (eventId) => ({
        url: "events/cancel-participation",
        method: "PATCH",
        body: { ...eventId },
      }),
      invalidatesTags: ["Event"],
    }),
    getFavoriteEvents: builder.query({
      query: () => `/events/favorite/`,
      providesTags: ["Favorite"],
    }),
  }),
});

export const {
  useGetEventsByTypeQuery,
  useGetEventByIdQuery,
  useGetEventsByOwnerIdQuery,
  useGetEventsUserParticipatedQuery,
  useCreateEventMutation,
  useUploadEventCoverImgMutation,
  useDeleteEventCoverImgMutation,
  useUpdateEventMutation,
  useUpdateEventParticipantsMutation,
  useGetParticipantsByIdQuery,
  useUserJoinToEventMutation,
  useUserCancelParticipationMutation,
  useGetFavoriteEventsQuery,
} = eventsApiSlice;
