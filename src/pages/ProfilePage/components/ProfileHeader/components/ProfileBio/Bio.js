import React from "react";
import * as S from "./Bio.styled";

function Bio({ userProfile }) {
  return (
    userProfile.bio && (
      <S.Container>
        <S.BioWrapper>
          <S.BioParagraph>{userProfile.bio}</S.BioParagraph>
        </S.BioWrapper>
      </S.Container>
    )
  );
}

export default Bio;
