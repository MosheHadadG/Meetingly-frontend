import React from "react";
import * as S from "./ErrorParagraph.styled";

function ErrorParagraph({ text, textAlign }) {
  return <S.ErrorParagraph textAlign={textAlign}>{text}</S.ErrorParagraph>;
}

export default ErrorParagraph;
