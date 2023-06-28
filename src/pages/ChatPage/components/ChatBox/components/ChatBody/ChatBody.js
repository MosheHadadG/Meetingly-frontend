import React, { useEffect, useRef } from "react";
import { format } from "timeago.js";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import {
  useGetChatMessagesQuery,
  useMarkMessagesAsReadMutation,
} from "../../../../../../redux/slices/apiSlices/chatApiSlice";
import { selectOnlineUsers } from "../../../../../../redux/slices/authSlice";
import { selectIsDesktop } from "../../../../../../redux/slices/uiSlice";
import { selectNumberUnreadChatsData } from "../../../../../../redux/slices/chatSlice";
import { totalUnreadMessage } from "../../../../utils/chat.util";
import ChatBodySkeleton from "./ChatBodySkeleton";
import * as S from "./ChatBody.styled";

function ChatBody({ chat, userLoggedIn, isPrivateMode }) {
  const scroll = useRef();
  const isDesktop = useSelector(selectIsDesktop);
  const onlineUsers = useSelector(selectOnlineUsers);
  const totalUnreadChatsData = useSelector(selectNumberUnreadChatsData);
  const {
    data: messages,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChatMessagesQuery({ chatId: chat._id });
  const [markMessagesAsRead] = useMarkMessagesAsReadMutation();

  useEffect(() => {
    scroll.current?.scrollIntoView({
      behavior: "smooth",
      block: isDesktop ? `end` : `start`,
    });
  }, [messages]);

  useEffect(() => {
    if (messages?.result) {
      const markAsRead = async () => {
        try {
          await markMessagesAsRead({ chatId: chat._id });
        } catch (err) {
          console.log(err);
        }
      };

      if (!totalUnreadChatsData?.totalUnreadMessageInChat) return;

      if (totalUnreadMessage(chat._id, totalUnreadChatsData.totalUnreadMessageInChat)) {
        markAsRead();
      }
    }
  }, [messages]);

  const isOnline = (user) => {
    return onlineUsers.find((onlineUser) => onlineUser.userId === user._id);
  };

  const isOwnMessage = (message) => {
    return message.senderId._id === userLoggedIn._id;
  };

  const renderChatBody = () => {
    if (isLoading) {
      return <ChatBodySkeleton isDesktop={isDesktop} />;
    } else if (isSuccess) {
      return (
        <S.ScrollContainer isDesktop={isDesktop}>
          <S.ChatBody isDesktop={isDesktop}>
            {messages.result.map((message) => (
              <S.MessageContainer
                ref={scroll}
                key={message._id}
                own={isOwnMessage(message)}
              >
                <S.AvatarContainer>
                  {!isPrivateMode &&
                    isOnline(message.senderId) &&
                    !isOwnMessage(message) && <S.OnlineDot />}
                  <Avatar
                    sx={{ width: 35, height: 35 }}
                    src={
                      isOwnMessage(message)
                        ? userLoggedIn.avatar
                        : message.senderId.avatar
                    }
                  />
                </S.AvatarContainer>
                <S.Message own={isOwnMessage(message)}>
                  {!isPrivateMode && !isOwnMessage(message) && (
                    <S.FullName>{`${message.senderId.firstName} ${message.senderId.lastName}`}</S.FullName>
                  )}
                  <S.MessageText>{message.text}</S.MessageText>
                  <S.CreatedAt>{format(message.createdAt, "he_HE")}</S.CreatedAt>
                </S.Message>
              </S.MessageContainer>
            ))}
          </S.ChatBody>
        </S.ScrollContainer>
      );
    } else if (isError) {
      console.log(error);
    }
  };

  return <>{renderChatBody()}</>;
}

export default ChatBody;
