import React, { useEffect, useState } from "react";
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

  const handleSend = async (e) => {
    // e.preventDefault();
    const messageData = {
      chatId: chat._id,
      text: newMessage,
    };
    try {
      const messageSent = await addMessage(messageData);

      dispatch(
        chatApiSlice.util.updateQueryData(
          "getChatMessages",
          { chatId: messageSent.data.message.chatId },
          (chatMessegesCache) => {
            chatMessegesCache.result.push(messageSent.data.message);
          }
        )
      );
      setNewMessage("");
      console.log(messageSent);
      socket?.emit("sendMessage", {
        messageData: {
          messageSent: { ...messageSent.data.message },
          receiverUsername: chat.members.find(
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
        width={"20%"}
        fontSize={"1.2rem"}
        handleClick={handleSend}
      />
    </S.Container>
  );
}

export default ChatSender;
