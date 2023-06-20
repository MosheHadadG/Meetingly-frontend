import React from "react";
import * as S from "./CardSubHeader.styled";

function CardSubHeader({ text, icon, backgroundColor, handleClick }) {
  return (
    <S.Container onClick={handleClick}>
      <S.CardSubHeaderCircle backgroundColor={backgroundColor}>
        <S.CardSubHeaderIconWrapper>{icon}</S.CardSubHeaderIconWrapper>
      </S.CardSubHeaderCircle>
      <S.CardSubHeaderSpan>
        <S.CardSubHeaderParagraph>{text}</S.CardSubHeaderParagraph>
      </S.CardSubHeaderSpan>
    </S.Container>
  );
}

export default CardSubHeader;
