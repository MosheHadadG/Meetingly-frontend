import React from "react";
import * as S from "./TextArea.styled";

function TextArea({
  name,
  width,
  height,
  placeHolder,
  value,
  handleChange,
  handleBlur,
  onFocus,
  error,
  boxShadow,
}) {
  return (
    <S.TextArea
      name={name}
      width={width}
      placeholder={placeHolder}
      value={value}
      onChange={handleChange}
      height={height}
      onBlur={handleBlur}
      onFocus={onFocus}
      error={error}
      boxShadow={boxShadow}
    />
  );
}

export default TextArea;
