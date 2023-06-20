import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import ErrorParagraph from "../../../../../../components/Input/ErrorParagraph/ErrorParagraph";
import Input from "../../../../../../components/Input/Input/Input";
import ButtonUploadFile from "../../../../../../components/Input/ButtonUploadFile/ButtonUploadFile";
import * as S from "./UploadAvatar.styled";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import CropOutlinedIcon from "@mui/icons-material/CropOutlined";

function UploadAvatar({
  formState,
  handleChange,
  handleBlur,
  setFieldValue,
  errors,
  touched,
}) {
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (formState.profileAvatarSrc) {
      setPreviewUrl(formState.profileAvatarSrc);
    }
  }, []);

  useEffect(() => {
    if (!formState.avatarFile) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(formState.avatarFile);
  }, [formState.avatarFile]);

  const pickedHandler = ({ target }) => {
    if (target.files && target.files.length === 1) {
      const pickedFile = target.files[0];
      setFieldValue("avatarFile", pickedFile);
      setIsValid(true);
      return;
    }
    setIsValid(false);
  };

  // const { avatar } = formState;

  return (
    <S.Container>
      <Avatar
        alt="Profile Avatar"
        className="profile-avatar-preview"
        src={previewUrl ? previewUrl : null}
        sx={{ width: 200, height: 200 }}
      />
      {errors.avatarFile && touched.avatarFile && (
        <ErrorParagraph text={errors.avatarFile} />
      )}
      <S.InputWrapper>
        <ButtonUploadFile
          position={"unset"}
          icon={!previewUrl ? <AddAPhotoIcon /> : <CropOutlinedIcon />}
          text={!previewUrl ? "העלה תמונת פרופיל" : "ערוך תמונת פרופיל"}
          width="200px"
          acceptFiles=".jpg, .png, .jpeg"
          name="coverImg"
          handleChange={pickedHandler}
          isDark={!previewUrl && true}
          error={errors.avatarFile && touched.avatarFile}
        />

        {/* <Input
          type="file"
          acceptFiles=".jpg, .png, .jpeg"
          name="avatar"
          handleChange={pickedHandler}
          handleBlur={handleBlur}
          error={errors.avatar && touched.avatar}
        />
        {errors.avatar && touched.avatar && (
          <ErrorParagraph text={errors.avatar} />
        )} */}
      </S.InputWrapper>
    </S.Container>
  );
}

export default UploadAvatar;
