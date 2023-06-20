import React from "react";
import * as S from "./Paragraph.styled";

function Paragraph({
  fontSize,
  fontColor,
  width,
  marginBottom,
  text,
  handleClick,
  icon,
  link,
  justifyContent,
}) {
  return (
    <S.ParagraphContainer
      fontColor={fontColor}
      width={width}
      marginBottom={marginBottom}
      justifyContent={justifyContent}
    >
      <S.Paragraph onClick={handleClick} link={link} fontSize={fontSize}>
        {text}
      </S.Paragraph>
      {icon}
    </S.ParagraphContainer>
  );
}

export default Paragraph;
