import React from "react";
import { useNavigate } from "react-router-dom";

import { Avatar } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Container } from "../../ChatHeader.styled";
import * as S from "../../../../../Conversation/Conversation.styled";

function ChatGroupHeader({ isDesktop, handleClick, currentChatData }) {
  const navigate = useNavigate();

  return (
    <Container>
      <S.Conversation>
        {!isDesktop && (
          <div onClick={handleClick}>
            <ArrowForwardIosIcon />
          </div>
        )}
        <S.UserContainer
          onClick={() =>
            navigate(`/events/${currentChatData.type}/${currentChatData._id}`)
          }
        >
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
