import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../../components/Spinner/Spinner";
import { useGetUserByUsernameQuery } from "../../../../redux/slices/apiSlices/authApiSlice";
import { selectCurrentUser } from "../../../../redux/slices/authSlice";
import * as S from "./ChatBox.styled";
import * as Sc from "../Conversation/Conversation.styled";
import { Avatar } from "@mui/material";
import ChatBody from "./components/ChatBody/ChatBody";
import ChatHeader from "./components/ChatHeader/ChatHeader";
import ChatSender from "./components/ChatSender/ChatSender";
import { selectCurrentChatUserData } from "../../../../redux/slices/chatSlice";

function ChatBox({ chat, setChatBoxOpen }) {
  const userLoggedIn = useSelector(selectCurrentUser);
  const currentChatUserData = useSelector(selectCurrentChatUserData);

  return (
    currentChatUserData && (
      <S.ChatBoxContainer>
        <ChatHeader
          chat={chat}
          userLoggedIn={userLoggedIn}
          setChatBoxOpen={setChatBoxOpen}
          currentChatUserData={currentChatUserData}
        />
        <ChatBody
          chat={chat}
          userLoggedIn={userLoggedIn}
          currentChatUserData={currentChatUserData}
        />
        <ChatSender chat={chat} userLoggedIn={userLoggedIn} />
      </S.ChatBoxContainer>
    )
  );
}

export default ChatBox;
