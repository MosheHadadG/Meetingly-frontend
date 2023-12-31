import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../../../components/Input/Button/Button";
import {
  chatApiSlice,
  useAddMessageMutation,
} from "../../../../../../redux/slices/apiSlices/chatApiSlice";
import { selectCurrentSocket } from "../../../../../../redux/slices/authSlice";
import * as S from "./ChatSender.styled";
import "./InputEmoji.css";

function ChatSender({ chat, userLoggedIn }) {
  const [newMessage, setNewMessage] = useState("");
  const [addMessage, { isLoading }] = useAddMessageMutation();
  const socket = useSelector(selectCurrentSocket);
  const dispatch = useDispatch();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async () => {
    if (!newMessage) return;

    const messageData = {
      chatId: chat._id,
      text: newMessage,
      chatType: chat.type,
    };
    try {
      const messageSent = await addMessage(messageData);

      // push new message to cache messages
      dispatch(
        chatApiSlice.util.updateQueryData(
          "getChatMessages",
          { chatId: messageSent.data.message.chatId },
          (chatMessegesCache) => {
            chatMessegesCache.result.push(messageSent.data.message);
          }
        )
      );

      // update chat updatedAt By last message createdAt and update last Message
      dispatch(
        chatApiSlice.util.updateQueryData(
          "getUserChats",
          { type: chat.type },
          (userChatsCache) => {
            const chats = userChatsCache.chats.map((chatCache) => {
              if (chatCache._id === chat._id) {
                return {
                  ...chatCache,
                  lastMessage: messageSent.data.message,
                  updatedAt: messageSent.data.message.createdAt,
                };
              }
              return chatCache;
            });
            return (userChatsCache = { chats });
          }
        )
      );

      setNewMessage("");

      socket?.emit("sendMessage", {
        messageData: {
          messageSent: { ...messageSent.data.message },
          receiversUsername: chat.members.filter(
            (username) => username !== userLoggedIn.username
          ),
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.Container>
      <InputEmoji
        value={newMessage}
        onEnter={handleSend}
        onChange={handleChange}
        placeholder="כתוב הודעה"
      />
      <Button
        text="שלח"
        color="var(--color-primary-purple)"
        width="20%"
        fontSize="1.2rem"
        handleClick={handleSend}
        isDisabled={!newMessage}
      />
    </S.Container>
  );
}

export default ChatSender;
