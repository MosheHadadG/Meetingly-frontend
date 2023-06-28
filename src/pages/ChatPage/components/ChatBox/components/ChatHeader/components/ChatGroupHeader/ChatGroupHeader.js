import React from "react";

import { Avatar } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import * as S from "../../../../../Conversation/Conversation.styled";
import { Container } from "../../ChatHeader.styled";
function ChatGroupHeader({ isDesktop, handleClick, currentChatData }) {
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
            <Avatar
              alt={currentChatData.title}
              src={currentChatData.imageSrc}
              sx={{ width: 56, height: 56 }}
            />
          </S.AvatarContainer>
          <S.NameContainer>
            <S.UserFullName>{currentChatData.title}</S.UserFullName>
          </S.NameContainer>
        </S.UserContainer>
      </S.Conversation>
    </Container>
  );
}

export default ChatGroupHeader;
