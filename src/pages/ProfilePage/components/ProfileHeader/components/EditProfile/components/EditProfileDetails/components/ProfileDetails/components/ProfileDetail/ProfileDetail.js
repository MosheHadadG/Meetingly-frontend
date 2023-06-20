import React from "react";
import * as S from "./ProfileDetail.styled";

function ProfileDetail({ text, label }) {
  return (
    <S.Container>
      <S.ProfileDetailSpan>
        <S.ProfileDetailsLabel>{label}</S.ProfileDetailsLabel>
        <S.ProfileDetailParagraph>{text}</S.ProfileDetailParagraph>
      </S.ProfileDetailSpan>
    </S.Container>
  );
}

export default ProfileDetail;
