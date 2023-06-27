import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { chatApiSlice } from "../redux/slices/apiSlices/chatApiSlice";

const useGetMessagesSocket = ({ socket, userLoggedIn }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userLoggedIn) return;

    // push new message to cache messages
    socket?.on("getMessage", ({ messageSent }) => {
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
        chatApiSlice.util.updateQueryData("getUserChats", undefined, (userChatsCache) => {
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
        })
      );
      dispatch(chatApiSlice.util.invalidateTags(["ChatsCounter"]));
    });
  }, [socket, userLoggedIn]);

  return;
};

export default useGetMessagesSocket;
