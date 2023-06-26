import React from "react";
import { useGetUserByUsernameQuery } from "../../../../../../redux/slices/apiSlices/authApiSlice";
import * as S from "../../../Conversation/Conversation.styled";
import { Container } from "./ChatHeader.styled";
import { Avatar } from "@mui/material";
import Spinner from "../../../../../../components/Spinner/Spinner";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";
import { selectIsDesktop } from "../../../../../../redux/slices/uiSlice";
import { selectOnlineUsers } from "../../../../../../redux/slices/authSlice";
import {
  selectCurrentChatUserData,
  selectCurrentUserData,
} from "../../../../../../redux/slices/chatSlice";

function ChatHeader({ setChatBoxOpen, currentChatUserData }) {
  const isDesktop = useSelector(selectIsDesktop);
  const onlineUsers = useSelector(selectOnlineUsers);

  const isOnline = (currentChatUserData) => {
    return onlineUsers.find(
      (onlineUser) => onlineUser.userId === currentChatUserData._id
    );
  };

  return (
    <Container>
      <S.Conversation>
        {!isDesktop && (
          <div onClick={() => setChatBoxOpen(null)}>
            <ArrowForwardIosIcon />
          </div>
        )}
        <S.UserContainer>
          <S.AvatarContainer>
            {isOnline(currentChatUserData) && <S.OnlineDot />}
            <Avatar
              alt={currentChatUserData.username}
              src={currentChatUserData.avatar}
              sx={{ width: 56, height: 56 }}
            />
          </S.AvatarContainer>
          <S.NameContainer>
            <S.UserFullName>{`${currentChatUserData.firstName} ${currentChatUserData.lastName}`}</S.UserFullName>
          </S.NameContainer>
        </S.UserContainer>
      </S.Conversation>
    </Container>
  );
}

export default ChatHeader;
