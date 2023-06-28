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
import {
  selectCurrentChatData,
  selectCurrentChatUserData,
  selectIsPrivateMode,
} from "../../../../redux/slices/chatSlice";

function ChatBox({ chat, setChatBoxOpen }) {
  const userLoggedIn = useSelector(selectCurrentUser);
  const currentChatData = useSelector(selectCurrentChatData);
  const isPrivateMode = useSelector(selectIsPrivateMode);

  return (
    currentChatData && (
      <S.ChatBoxContainer>
        <ChatHeader
          chat={chat}
          userLoggedIn={userLoggedIn}
          setChatBoxOpen={setChatBoxOpen}
          currentChatData={currentChatData}
          isPrivateMode={isPrivateMode}
        />
        <ChatBody
          chat={chat}
          userLoggedIn={userLoggedIn}
          currentChatData={currentChatData}
          isPrivateMode={isPrivateMode}
        />
        <ChatSender chat={chat} userLoggedIn={userLoggedIn} />
      </S.ChatBoxContainer>
    )
  );
}

export default ChatBox;
