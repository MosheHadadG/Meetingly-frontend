import React, { useEffect, useRef } from "react";
import {
  chatApiSlice,
  useGetChatMessagesQuery,
  useMarkMessagesAsReadMutation,
} from "../../../../../../redux/slices/apiSlices/chatApiSlice";
import { format } from "timeago.js";
import * as S from "./ChatBody.styled";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentSocket } from "../../../../../../redux/slices/authSlice";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { selectIsDesktop } from "../../../../../../redux/slices/uiSlice";
import {
  selectCurrentChatUserData,
  selectCurrentUserData,
  selectNumberUnreadChatsData,
} from "../../../../../../redux/slices/chatSlice";
import Spinner from "../../../../../../components/Spinner/Spinner";
import { totalUnreadMessage } from "../../../../utils/chat.util";
function ChatBody({ chat, userLoggedIn }) {
  const {
    data: messages,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChatMessagesQuery({ chatId: chat._id });
  const [markMessagesAsRead] = useMarkMessagesAsReadMutation();
  const scroll = useRef();
  const isDesktop = useSelector(selectIsDesktop);
  const userData = useSelector(selectCurrentChatUserData);
  const totalUnreadChatsData = useSelector(selectNumberUnreadChatsData);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const dispatch = useDispatch();
  const isOwnMessage = (message) => {
    return message.senderId === userLoggedIn._id;
  };

  useEffect(() => {
    if (messages?.result) {
      const markAsRead = async () => {
        try {
          await markMessagesAsRead({ chatId: chat._id });
        } catch (err) {
          console.log(err);
        }
      };

      console.log(messages.result);
      if (!totalUnreadChatsData?.totalUnreadMessageInChat) return;

      if (totalUnreadMessage(chat._id, totalUnreadChatsData.totalUnreadMessageInChat)) {
        markAsRead();
        // console.log("here");
        // dispatch(chatApiSlice.util.invalidateTags(["ChatsCounter"]));
      }
    }
  }, [messages]);

  const renderChatBody = () => {
    if (isLoading) {
      return <Spinner />;
    } else if (isSuccess) {
      return (
        <S.ScrollContainer isDesktop={isDesktop}>
          <S.ChatBody isDesktop={isDesktop}>
            {messages.result.map((message) => {
              return (
                <S.MessageContainer
                  ref={scroll}
                  key={message._id}
                  own={isOwnMessage(message)}
                >
                  <Avatar
                    sx={{ width: 35, height: 35 }}
                    src={isOwnMessage(message) ? userLoggedIn.avatar : userData.avatar}
                  />
                  <S.Message own={isOwnMessage(message)}>
                    <S.MessageText>{message.text}</S.MessageText>
                    <S.CreatedAt>{format(message.createdAt, "he_HE")}</S.CreatedAt>
                  </S.Message>
                </S.MessageContainer>
              );
            })}
          </S.ChatBody>
        </S.ScrollContainer>
      );
      console.log(messages);
    } else if (isError) {
      console.log(error);
    }
  };

  return <>{renderChatBody()}</>;
}

export default ChatBody;
