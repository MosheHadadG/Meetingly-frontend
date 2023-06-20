import React from "react";
import * as S from "./RegisterProgressBar.styled";
function RegisterProgressBar({ step }) {
  return (
    <S.ProgressBarContainer>
      <S.ProgressBar step={step} />
    </S.ProgressBarContainer>
  );
}

export default RegisterProgressBar;
