import { apiSlice } from "../../../api/apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserChats: builder.query({
      query: () => `/chat`,
      providesTags: ["Chats"],
    }),
    getChatMessages: builder.query({
      query: ({ chatId }) => `/chat/messages/?chatId=${chatId}`,
    }),

    addMessage: builder.mutation({
      query: (messageData) => ({
        url: "/chat/messages",
        method: "POST",
        body: { ...messageData },
      }),
    }),

    createChat: builder.mutation({
      query: ({ receiverUsername }) => ({
        url: "/chat",
        method: "POST",
        body: { receiverUsername },
      }),
      invalidatesTags: ["Chats"],
    }),

    GetNumberUnreadMessages: builder.query({
      query: () => "/chat/messages/number-unread-messages",
      providesTags: ["ChatsCounter"],
    }),

    markMessagesAsRead: builder.mutation({
      query: ({ chatId }) => ({
        url: "/chat/messages/mark-as-read",
        method: "PATCH",
        body: { chatId },
      }),
      invalidatesTags: ["ChatsCounter"],
    }),

    // markAsReadAllNotifications: builder.mutation({
    //   query: () => ({
    //     url: "user/notifications/mark-as-read-all",
    //     method: "POST",
    //   }),
    //   invalidatesTags: ["NotificationsCounter"],
    // }),

    // getEventById: builder.query({
    //   query: (eventId) => `/events/specific-event/?eventId=${eventId}`,
    //   providesTags: ["Event"],
    // }),

    // uploadEventCoverImg: builder.mutation({
    //   query: (formData) => ({
    //     url: "events/upload-event-cover",
    //     method: "POST",
    //     body: formData,
    //   }),
    // }),
  }),
});

export const {
  useGetUserChatsQuery,
  useGetChatMessagesQuery,
  useAddMessageMutation,
  useCreateChatMutation,
  useGetNumberUnreadMessagesQuery,
  useMarkMessagesAsReadMutation,
} = chatApiSlice;
