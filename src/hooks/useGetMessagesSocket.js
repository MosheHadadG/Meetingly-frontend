import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatApiSlice } from "../redux/slices/apiSlices/chatApiSlice";

const useGetMessagesSocket = ({ socket, userLoggedIn }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userLoggedIn) return;

    socket?.on("getMessage", ({ messageSent }) => {
      // push new message to cache messages
      dispatch(
        chatApiSlice.util.updateQueryData(
          "getChatMessages",
          { chatId: messageSent.chatId },
          (chatMessegesCache) => {
            chatMessegesCache.result.push(messageSent);
          }
        )
      );

      // update chat updatedAt By last message createdAt and update last Message
      dispatch(
        chatApiSlice.util.updateQueryData(
          "getUserChats",
          { type: messageSent.chatType },
          (userChatsCache) => {
            const findChat = userChatsCache.chats.find(
              (chatCache) => chatCache._id === messageSent.chatId
            );
            if (!findChat) return dispatch(chatApiSlice.util.invalidateTags(["Chats"]));
            const chats = userChatsCache.chats.map((chatCache) => {
              if (chatCache._id === messageSent.chatId) {
                return {
                  ...chatCache,
                  lastMessage: messageSent,
                  updatedAt: messageSent.createdAt,
                };
              }
              return chatCache;
            });

            return (userChatsCache = { chats });
          }
        )
      );
      dispatch(chatApiSlice.util.invalidateTags(["ChatsCounter"]));
    });
  }, [socket, userLoggedIn]);

  return;
};

export default useGetMessagesSocket;
