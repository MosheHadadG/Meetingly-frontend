import React from "react";
import { useSelector } from "react-redux";
import { selectOnlineUsers } from "../../../../../../../../redux/slices/authSlice";

import { Avatar } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import * as S from "../../../../../Conversation/Conversation.styled";
import { Container } from "../../ChatHeader.styled";
import { useNavigate } from "react-router-dom";

function ChatPrivateHeader({ isDesktop, handleClick, currentChatData }) {
  const onlineUsers = useSelector(selectOnlineUsers);
  const navigate = useNavigate();

  const isOnline = (currentChatData) => {
    return onlineUsers.find((onlineUser) => onlineUser.userId === currentChatData._id);
  };

  return (
    <Container>
      <S.Conversation>
        {!isDesktop && (
          <div onClick={handleClick}>
            <ArrowForwardIosIcon />
          </div>
        )}
        <S.UserContainer onClick={() => navigate(`/profile/${currentChatData.username}`)}>
          <S.AvatarContainer>
            {isOnline(currentChatData) && <S.OnlineDot />}
            <Avatar
              alt={currentChatData.username}
              src={currentChatData.avatar}
              sx={{ width: 56, height: 56 }}
            />
          </S.AvatarContainer>
          <S.NameContainer>
            <S.UserFullName>{`${currentChatData.firstName} ${currentChatData.lastName}`}</S.UserFullName>
            <S.UserStatus>
              {isOnline(currentChatData) ? "מחובר" : "לא מחובר"}
            </S.UserStatus>
          </S.NameContainer>
        </S.UserContainer>
      </S.Conversation>
    </Container>
  );
}

export default ChatPrivateHeader;
