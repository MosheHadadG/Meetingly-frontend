import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authApiSlice } from "../../redux/slices/apiSlices/authApiSlice";
import {
  chatApiSlice,
  useGetUserChatsQuery,
} from "../../redux/slices/apiSlices/chatApiSlice";
import { selectCurrentSocket } from "../../redux/slices/authSlice";
import { setCurrentChatUserData } from "../../redux/slices/chatSlice";
import { selectIsDesktop } from "../../redux/slices/uiSlice";
import * as S from "./ChatPage.styled";
import ChatBox from "./components/ChatBox/ChatBox";
import Conversation from "./components/Conversation/Conversation";

function ChatPage() {
  const {
    data: userChats,
    isLoading,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useGetUserChatsQuery();
  const [currentChat, setCurrentChat] = useState(null);

  const socket = useSelector(selectCurrentSocket);
  const isDesktop = useSelector(selectIsDesktop);
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, [socket]);

  const renderConversations = () => {
    if (isLoading) {
      console.log("loading...");
    } else if (isSuccess) {
      return userChats.chats.map((chat) => {
        return (
          <div key={chat._id} onClick={() => setCurrentChat(chat)}>
            <Conversation
              handleClick={({ userData }) => dispatch(setCurrentChatUserData(userData))}
              chat={chat}
              isDesktop={isDesktop}
            />
          </div>
        );
      });
    }
  };

  return (
    <S.Chat>
      <S.RightSideChat isDesktop={isDesktop} chatBoxOpen={currentChat}>
        <S.ScrollContainer isDesktop={isDesktop}>
          <S.ChatContainer isDesktop={isDesktop}>
            <h2>הודעות פרטיות</h2>
            <S.ChatList>{renderConversations()}</S.ChatList>
          </S.ChatContainer>
        </S.ScrollContainer>
      </S.RightSideChat>

      {(isDesktop || currentChat) && (
        <S.LeftSideChat isDesktop={isDesktop}>
          {currentChat ? (
            <ChatBox chat={currentChat} setChatBoxOpen={setCurrentChat} />
          ) : (
            <S.ChatBoxEmpyMessage>לחץ על צ'אט כדי להתחיל שיחה...</S.ChatBoxEmpyMessage>
          )}
        </S.LeftSideChat>
      )}
    </S.Chat>
  );
}

export default ChatPage;
