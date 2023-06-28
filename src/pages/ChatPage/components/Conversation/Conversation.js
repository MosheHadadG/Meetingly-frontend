import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserByUsernameQuery } from "../../../../redux/slices/apiSlices/authApiSlice";
import { selectCurrentUser, selectOnlineUsers } from "../../../../redux/slices/authSlice";
import * as S from "./Conversation.styled";
import { Avatar } from "@mui/material";
import {
  selectIsPrivateMode,
  selectNumberUnreadChatsData,
  setCurrentChatData,
} from "../../../../redux/slices/chatSlice";
import { totalUnreadMessage } from "../../utils/chat.util";
import { chatApiSlice } from "../../../../redux/slices/apiSlices/chatApiSlice";
import ConversationCardSkeleton from "./ConversationCardSkeleton";

function Conversation({ chat, isDesktop, handleClick, startConversation }) {
  const userLoggedIn = useSelector(selectCurrentUser);
  const isPrivateMode = useSelector(selectIsPrivateMode);
  const {
    data: userData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserByUsernameQuery(
    chat.members.find((username) => username !== userLoggedIn.username),
    { skip: !isPrivateMode }
  );

  const onlineUsers = useSelector(selectOnlineUsers);
  const totalUnreadChatsData = useSelector(selectNumberUnreadChatsData);
  const dispatch = useDispatch();

  const selectCacheMessages = chatApiSlice.endpoints.getChatMessages.select({
    chatId: chat._id,
  });
  const { data: messages, isLoading: s } = useSelector(selectCacheMessages);

  useEffect(() => {
    if (userData && startConversation) {
      if (startConversation._id === chat._id) {
        dispatch(setCurrentChatData(userData));
      }
    }
  }, [userData, startConversation]);

  const isOnline = (userData) => {
    return onlineUsers.find((onlineUser) => onlineUser.userId === userData._id);
  };

  const renderCounterUnreadMessage = (chatId) => {
    if (!totalUnreadChatsData?.totalUnreadMessageInChat) return;

    if (!totalUnreadMessage(chatId, totalUnreadChatsData.totalUnreadMessageInChat))
      return;

    return (
      <S.Counter>
        {totalUnreadMessage(chatId, totalUnreadChatsData.totalUnreadMessageInChat)}
      </S.Counter>
    );
  };

  const renderLastMessage = () => {
    if (messages?.result?.length > 0) {
      let lastMessage = messages.result[messages.result.length - 1];
      if (lastMessage.senderId._id === userLoggedIn._id) {
        return `את/ה: ${lastMessage.text}`;
      } else {
        return lastMessage.text;
      }
    } else {
      if (chat.lastMessage) {
        if (chat.lastMessage.senderId._id === userLoggedIn._id) {
          return `את/ה: ${chat.lastMessage?.text}`;
        } else {
          return chat.lastMessage?.text;
        }
      } else {
        return null;
      }
    }
  };

  const renderPrivateConversation = () => {
    if (isLoading) {
      return <ConversationCardSkeleton />;
    } else if (isSuccess) {
      return (
        <S.Conversation onClick={() => handleClick({ data: userData })}>
          <S.UserContainer>
            <S.AvatarContainer>
              {isOnline(userData) && <S.OnlineDot />}
              <Avatar
                alt={userData.username}
                src={userData.avatar}
                sx={{ width: 56, height: 56 }}
              />
            </S.AvatarContainer>

            <S.NameContainer isDesktop={isDesktop}>
              <S.UserFullName>{`${userData.firstName} ${userData.lastName}`}</S.UserFullName>
              <S.UserStatus>{renderLastMessage()}</S.UserStatus>
            </S.NameContainer>
          </S.UserContainer>
          {renderCounterUnreadMessage(chat._id)}
        </S.Conversation>
      );
    } else if (isError) {
      console.log(error);
    }
  };

  const renderGroupConversation = () => {
    if (chat.type === "group") {
      return (
        <S.Conversation onClick={() => handleClick({ data: chat.eventId })}>
          <S.UserContainer>
            <S.AvatarContainer>
              <Avatar
                alt={chat.eventId.title}
                src={chat.eventId.imageSrc}
                sx={{ width: 56, height: 56 }}
              />
            </S.AvatarContainer>

            <S.NameContainer isDesktop={isDesktop}>
              <S.UserFullName>{chat.eventId.title}</S.UserFullName>
              <S.UserStatus>{renderLastMessage()}</S.UserStatus>
            </S.NameContainer>
          </S.UserContainer>
          {renderCounterUnreadMessage(chat._id)}
        </S.Conversation>
      );
    } else {
      return <ConversationCardSkeleton />;
    }
  };

  return <>{isPrivateMode ? renderPrivateConversation() : renderGroupConversation()}</>;
}

export default Conversation;
