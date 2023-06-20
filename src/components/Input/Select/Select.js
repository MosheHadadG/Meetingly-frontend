import React from "react";
import * as S from "./Select.styled";

function Select({
  width,
  defaultValue,
  name,
  options,
  handleChange,
  handleBlur,
  onFocus,
  error,
}) {
  return (
    <S.Select
      width={width}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={onFocus}
      error={error}
      name={name}
      defaultValue={defaultValue}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </S.Select>
  );
}

export default Select;
