import React from "react";
import { useSelector } from "react-redux";
import { selectIsDesktop } from "../../../../../../redux/slices/uiSlice";
import { selectOnlineUsers } from "../../../../../../redux/slices/authSlice";

import { Avatar } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Container } from "./ChatHeader.styled";
import * as S from "../../../Conversation/Conversation.styled";
import { useLocation, useNavigate } from "react-router-dom";

function ChatHeader({ setChatBoxOpen, currentChatUserData }) {
  const isDesktop = useSelector(selectIsDesktop);
  const onlineUsers = useSelector(selectOnlineUsers);
  const location = useLocation();
  const navigate = useNavigate();

  const isOnline = (currentChatUserData) => {
    return onlineUsers.find(
      (onlineUser) => onlineUser.userId === currentChatUserData._id
    );
  };

  const handleClick = () => {
    setChatBoxOpen(null);
    navigate(location.pathname, { replace: true });
  };

  return (
    <Container>
      <S.Conversation>
        {!isDesktop && (
          <div onClick={handleClick}>
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
            <S.UserStatus>
              {isOnline(currentChatUserData) ? "מחובר" : "לא מחובר"}
            </S.UserStatus>
          </S.NameContainer>
        </S.UserContainer>
      </S.Conversation>
    </Container>
  );
}

export default ChatHeader;
