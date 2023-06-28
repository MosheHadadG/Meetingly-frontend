import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUserChatsQuery } from "../../redux/slices/apiSlices/chatApiSlice";
import {
  selectIsPrivateMode,
  setCurrentChatData,
  setIsPrivateMode,
} from "../../redux/slices/chatSlice";
import { selectIsDesktop } from "../../redux/slices/uiSlice";
import ChatBox from "./components/ChatBox/ChatBox";
import ConversationCardSkeleton from "./components/Conversation/ConversationCardSkeleton";
import Conversation from "./components/Conversation/Conversation";
import * as S from "./ChatPage.styled";

const ChatPage = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const isPrivateMode = useSelector(selectIsPrivateMode);
  const isDesktop = useSelector(selectIsDesktop);
  const {
    data: userChats,
    isLoading,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useGetUserChatsQuery({ type: isPrivateMode ? "private" : "group" });

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userChats && location?.state?.currentChat) {
      setCurrentChat(location.state.currentChat);
    }
  }, [location, userChats]);

  const handleClickConversation = (chat) => {
    setCurrentChat(chat);
    navigate(location.pathname, { replace: true });
  };

  const sortByLastMessageDate = (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt);

  const renderCardSkeleton = (cardsNum) =>
    Array(cardsNum)
      .fill(0)
      .map((_, idx) => <ConversationCardSkeleton key={idx} />);

  const handleClickChatMenu = (boolean) => {
    dispatch(setIsPrivateMode(boolean));
    setCurrentChat(null);
  };

  const renderConversations = () => {
    if (isLoading) {
      return renderCardSkeleton(5);
    } else if (isSuccess) {
      const sortedConversation = [...userChats.chats].sort(sortByLastMessageDate);

      return sortedConversation.map((chat) => (
        <div key={chat._id} onClick={() => handleClickConversation(chat)}>
          <Conversation
            startConversation={location?.state?.currentChat}
            handleClick={({ data }) => dispatch(setCurrentChatData(data))}
            chat={chat}
            isDesktop={isDesktop}
          />
        </div>
      ));
    }
  };

  return (
    <S.Chat>
      <S.RightSideChat isDesktop={isDesktop} chatBoxOpen={currentChat}>
        <S.ScrollContainer isDesktop={isDesktop}>
          <S.ChatContainer isDesktop={isDesktop}>
            <S.ChatMenu>
              <S.ChatMenuSpan onClick={() => handleClickChatMenu(true)}>
                פרטי
              </S.ChatMenuSpan>
              <S.ChatMenuSpan onClick={() => handleClickChatMenu(false)}>
                קבוצתי
              </S.ChatMenuSpan>
            </S.ChatMenu>
            <S.ChatList>{renderConversations()}</S.ChatList>
          </S.ChatContainer>
        </S.ScrollContainer>
      </S.RightSideChat>

      {(isDesktop || currentChat) && (
        <S.LeftSideChat isDesktop={isDesktop}>
          {currentChat ? (
            <ChatBox chat={currentChat} setChatBoxOpen={setCurrentChat} isPrivateMode />
          ) : (
            <S.ChatBoxEmpyMessage>לחץ על צ'אט כדי להתחיל שיחה...</S.ChatBoxEmpyMessage>
          )}
        </S.LeftSideChat>
      )}
    </S.Chat>
  );
};

export default ChatPage;
