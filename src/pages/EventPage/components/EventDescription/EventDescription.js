import React from "react";
import * as S from "./EventDescription.styled";

function EventDescription({ description }) {
  return (
    <S.Container>
      <S.EventDescriptionTitle>תיאור האירוע</S.EventDescriptionTitle>
      <S.EventDescriptionSpan>
        <S.EventDescriptionParagraph>{description}</S.EventDescriptionParagraph>
      </S.EventDescriptionSpan>
    </S.Container>
  );
}

export default EventDescription;
