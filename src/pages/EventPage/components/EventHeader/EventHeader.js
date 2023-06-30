import React from "react";
import * as S from "./EventHeader.styled";

function EventHeader({ title, imageSrc, isDesktop }) {
  return (
    <S.Container>
      <S.WrapperImg isDesktop={isDesktop}>
        <S.EventImg src={imageSrc} isDesktop={isDesktop} />
      </S.WrapperImg>
      {title && <S.EventTitle>{title}</S.EventTitle>}
    </S.Container>
  );
}

export default EventHeader;
