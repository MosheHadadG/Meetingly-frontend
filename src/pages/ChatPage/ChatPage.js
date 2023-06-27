import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  chatApiSlice,
  useGetUserChatsQuery,
} from "../../redux/slices/apiSlices/chatApiSlice";
import { setCurrentChatUserData } from "../../redux/slices/chatSlice";
import { selectIsDesktop } from "../../redux/slices/uiSlice";
import * as S from "./ChatPage.styled";
import ChatBox from "./components/ChatBox/ChatBox";
import ConversationCardSkeleton from "./components/Conversation/ConversationCardSkeleton";
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

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDesktop = useSelector(selectIsDesktop);

  useEffect(() => {
    if (userChats && location?.state?.currentChat) {
      setCurrentChat(location.state.currentChat);
    }
  }, [location, userChats]);

  const handleClickConversation = (chat) => {
    setCurrentChat(chat);
    navigate(location.pathname, { replace: true });
  };

  const sortByLastMessageDate = (a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  };

  function renderCardSkeleton(cardsNum) {
    return Array(cardsNum)
      .fill(0)
      .map((_, idx) => {
        return <ConversationCardSkeleton key={idx} />;
      });
  }

  const renderConversations = () => {
    if (isLoading) {
      return renderCardSkeleton(5);
    } else if (isSuccess) {
      const sortedConversation = [...userChats.chats].sort(sortByLastMessageDate);
      // console.log(sortedConversation);
      return sortedConversation.map((chat) => {
        return (
          <div key={chat._id} onClick={() => handleClickConversation(chat)}>
            <Conversation
              startConversation={location?.state?.currentChat}
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
