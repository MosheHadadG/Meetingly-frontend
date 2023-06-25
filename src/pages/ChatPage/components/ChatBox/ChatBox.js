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

function ChatBox({ chat, setChatBoxOpen }) {
  const userLoggedIn = useSelector(selectCurrentUser);

  return (
    <>
      <S.ChatBoxContainer>
        <ChatHeader
          chat={chat}
          userLoggedIn={userLoggedIn}
          setChatBoxOpen={setChatBoxOpen}
        />
        <ChatBody chat={chat} userLoggedIn={userLoggedIn} />
        <ChatSender chat={chat} userLoggedIn={userLoggedIn} />
      </S.ChatBoxContainer>
    </>
  );
}

export default ChatBox;
