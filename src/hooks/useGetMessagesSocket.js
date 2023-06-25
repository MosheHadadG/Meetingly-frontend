import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { chatApiSlice } from "../redux/slices/apiSlices/chatApiSlice";

const useGetMessagesSocket = ({ socket, userLoggedIn }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userLoggedIn) return;

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
      dispatch(chatApiSlice.util.invalidateTags(["ChatsCounter", "Chats"]));
    });
  }, [socket, userLoggedIn]);

  return;
};

export default useGetMessagesSocket;
