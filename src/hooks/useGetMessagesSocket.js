import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatApiSlice } from "../redux/slices/apiSlices/chatApiSlice";
import { selectIsPrivateMode } from "../redux/slices/chatSlice";

const useGetMessagesSocket = ({ socket, userLoggedIn }) => {
  const dispatch = useDispatch();
  const isPrivateMode = useSelector(selectIsPrivateMode);

  useEffect(() => {
    if (!userLoggedIn) return;

    // push new message to cache messages
    socket?.on("getMessage", ({ messageSent }) => {
      console.log(messageSent);
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
          { type: isPrivateMode ? "private" : "group" },
          (userChatsCache) => {
            const chats = userChatsCache.chats.map((chatCache) => {
              if (chatCache._id === messageSent.chatId) {
                console.log(chatCache);
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
