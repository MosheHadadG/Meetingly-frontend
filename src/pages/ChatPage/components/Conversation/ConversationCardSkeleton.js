import React from "react";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import * as S from "./Conversation.styled";
function ConversationCardSkeleton() {
  return (
    <S.ConversationSkeleton>
      <S.UserContainer>
        <Skeleton width={56} height={56} borderRadius={"50%"} />
      </S.UserContainer>
      <S.NameContainer>
        <Skeleton width={80} />
        <Skeleton width={100} />
      </S.NameContainer>
    </S.ConversationSkeleton>
  );
}

export default ConversationCardSkeleton;
