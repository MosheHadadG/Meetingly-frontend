import React from "react";
import Skeleton from "react-loading-skeleton";
import * as S from "./ChatBody.styled";

function ChatBodySkeleton({ isDesktop }) {
  const chatBodyArray = [true, false, true, false, true, false];
  return (
    <S.ChatBody isDesktop={isDesktop}>
      {chatBodyArray.map((i, idx) => {
        return (
          <S.MessageContainer key={idx} own={i}>
            <Skeleton width={35} height={35} borderRadius={"50%"} />
            <S.MessageSkeleton>
              <S.MessageText>
                <Skeleton count={1} width={100} />
              </S.MessageText>
              <S.CreatedAt>
                <Skeleton count={1} width={50} />
              </S.CreatedAt>
            </S.MessageSkeleton>
          </S.MessageContainer>
        );
      })}
    </S.ChatBody>
  );
}

export default ChatBodySkeleton;
