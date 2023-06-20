import React from "react";
import * as S from "./EventHeader.styled";

function EventHeader({ title, imageSrc }) {
  return (
    <S.Container>
      <S.WrapperImg>
        <S.EventImg src={imageSrc} />
      </S.WrapperImg>
      {title && <S.EventTitle>{title}</S.EventTitle>}
    </S.Container>
  );
}

export default EventHeader;
