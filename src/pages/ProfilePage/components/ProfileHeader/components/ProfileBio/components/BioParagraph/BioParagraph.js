import React from "react";
import * as S from "./BioParagraph.styled";

function BioParagraph({ userProfile }) {
  return (
    <S.Container>
      <S.BioParagraph>
        {userProfile.bio ? userProfile.bio : "עדיין אין ביוגרפיה"}
      </S.BioParagraph>
    </S.Container>
  );
}

export default BioParagraph;
