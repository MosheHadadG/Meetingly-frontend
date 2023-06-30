import React from "react";
import Skeleton from "react-loading-skeleton";
import * as S from "./CardSubHeader.styled";

function CardSubHeaderSkeleton() {
  return (
    <S.Container>
      <S.CardSubHeaderCircle>
        <Skeleton width={60} height={60} borderRadius={"50%"} />
      </S.CardSubHeaderCircle>
    </S.Container>
  );
}

export default CardSubHeaderSkeleton;
