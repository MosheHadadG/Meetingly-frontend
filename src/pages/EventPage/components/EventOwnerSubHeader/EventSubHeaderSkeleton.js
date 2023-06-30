import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import CardSubHeaderSkeleton from "./components/CardSubHeader/CardSubHeaderSkeleton";
import * as S from "./components/EventParticipatingSubHeader/EventParticipatingSubHeader.styled";

function EventSubHeaderSkeleton({ cardsNum }) {
  const renderCards = () => {
    return Array(cardsNum)
      .fill(0)
      .map((_, idx) => {
        return <CardSubHeaderSkeleton key={idx} />;
      });
  };

  return <S.Container>{renderCards()}</S.Container>;
}

export default EventSubHeaderSkeleton;
