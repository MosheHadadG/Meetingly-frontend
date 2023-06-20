import React from "react";
import * as S from "./EventDetail.styled";

function EventDetail({ text, icon }) {
  return (
    <S.Container>
      <S.EventDetailSpan>
        {icon}
        <S.EventDetailParagraph>{text}</S.EventDetailParagraph>
      </S.EventDetailSpan>
    </S.Container>
  );
}

export default EventDetail;
