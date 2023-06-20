import React from "react";
import * as S from "./Input.styled";

function Input({
  type,
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
  inputRef,
  acceptFiles,
  fontSize,
}) {
  return (
    <S.Input
      type={type}
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
      ref={inputRef}
      accept={acceptFiles}
      fontSize={fontSize}
    />
  );
}

export default Input;
