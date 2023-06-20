import React from "react";
import * as S from "./Button.styled";

function Button({
  width,
  text,
  icon,
  color,
  fontColor,
  handleClick,
  isDisabled,
  height,
  type,
  fontSize,
  fontWeight,
  padding,
  name,
  borderRaduis,
}) {
  return (
    <S.ButtonContainer
      width={width}
      height={height}
      padding={padding}
      borderRaduis={borderRaduis}
      color={color}
      onClick={handleClick}
      disabled={isDisabled}
      type={type}
      fontSize={fontSize}
      name={name}
    >
      {text && (
        <S.TextContainer fontColor={fontColor} fontWeight={fontWeight}>
          {text}
        </S.TextContainer>
      )}
      {icon && <img style={{ height: height }} src={icon} alt="" />}
    </S.ButtonContainer>
  );
}

export default Button;
