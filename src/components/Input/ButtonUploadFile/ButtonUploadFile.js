import React, { useRef } from "react";
import * as S from "./ButtonUploadFile.styled";

function ButtonUploadFile({
  text,
  icon,
  width,
  handleChange,
  acceptFiles,
  isDark,
  position,
  error,
}) {
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <S.Container width={width} position={position}>
      <S.ButtonUploadFileWrapper>
        <S.InputFile
          type="file"
          accept={acceptFiles}
          ref={hiddenFileInput}
          onChange={handleChange}
          // style={{ display: "none" }}
        />
        <S.ButtonUploadFile
          type="button"
          onClick={handleClick}
          error={error}
          isDark={isDark}
        >
          <S.ButtonUploadFileSpan>
            <S.ButtonUploadFileParagraph>{text}</S.ButtonUploadFileParagraph>
            <S.ButtonUploadFileIconWrapper>{icon}</S.ButtonUploadFileIconWrapper>
          </S.ButtonUploadFileSpan>
        </S.ButtonUploadFile>
      </S.ButtonUploadFileWrapper>
    </S.Container>
  );
}

export default ButtonUploadFile;
