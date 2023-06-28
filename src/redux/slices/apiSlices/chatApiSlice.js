import { apiSlice } from "../../../api/apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserChats: builder.query({
      query: ({ type }) => `/chat?type=${type}`,
      providesTags: ["Chats"],
    }),

    createPrivateChat: builder.mutation({
      query: ({ receiverUsername }) => ({
        url: "/chat/private",
        method: "POST",
        body: { receiverUsername },
      }),
      invalidatesTags: ["Chats"],
    }),

    createGroupChat: builder.mutation({
      query: ({ eventId }) => ({
        url: "/chat/group",
        method: "POST",
        body: { eventId },
      }),
    }),

    addMemberToChat: builder.mutation({
      query: ({ eventId }) => ({
        url: "/chat/group/add-member",
        method: "PATCH",
        body: { eventId },
      }),
      invalidatesTags: ["Chats"],
    }),

    removeMemberFromChat: builder.mutation({
      query: ({ eventId }) => ({
        url: "/chat/group/remove-member",
        method: "PATCH",
        body: { eventId },
      }),
      invalidatesTags: ["Chats"],
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
  }),
});

export const {
  useGetUserChatsQuery,
  useGetChatMessagesQuery,
  useAddMessageMutation,
  useCreatePrivateChatMutation,
  useCreateGroupChatMutation,
  useAddMemberToChatMutation,
  useGetNumberUnreadMessagesQuery,
  useMarkMessagesAsReadMutation,
} = chatApiSlice;
