import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../components/Spinner/Spinner";
import { useGetUserByUsernameQuery } from "../../../../redux/slices/apiSlices/authApiSlice";
import { selectCurrentUser, selectOnlineUsers } from "../../../../redux/slices/authSlice";
import * as S from "./Conversation.styled";
import { Avatar } from "@mui/material";
import {
  selectNumberUnreadChatsData,
  setCurrentChatUserData,
  setCurrentUserData,
} from "../../../../redux/slices/chatSlice";
import { totalUnreadMessage } from "../../utils/chat.util";
function Conversation({ chat, isDesktop, handleClick, startConversation }) {
  const userLoggedIn = useSelector(selectCurrentUser);
  const {
    data: userData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserByUsernameQuery(
    chat.members.find((username) => username !== userLoggedIn.username)
  );

  const onlineUsers = useSelector(selectOnlineUsers);
  const totalUnreadChatsData = useSelector(selectNumberUnreadChatsData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData && startConversation) {
      if (startConversation._id === chat._id) {
        dispatch(setCurrentChatUserData(userData));
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

  const renderConversation = () => {
    if (isLoading) {
      return <Spinner />;
    } else if (isSuccess) {
      return (
        <S.Conversation onClick={() => handleClick({ userData })}>
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
              <S.UserStatus>{isOnline(userData) ? "מחובר" : "לא מחובר"}</S.UserStatus>
            </S.NameContainer>
          </S.UserContainer>
          {renderCounterUnreadMessage(chat._id)}
        </S.Conversation>
      );
    } else if (isError) {
      console.log(error);
    }
  };

  return <>{renderConversation()}</>;
}

export default Conversation;
