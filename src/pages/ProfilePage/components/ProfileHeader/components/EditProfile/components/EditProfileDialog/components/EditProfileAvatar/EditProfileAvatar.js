import React, { useContext } from "react";
import { useFormik } from "formik";
import { snackBarContext } from "../../../../../../../../../../services/contexts/SnackBar";
import {
  useDeleteAvatarImgMutation,
  useUpdateUserMutation,
  useUploadAvatarMutation,
} from "../../../../../../../../../../redux/slices/apiSlices/authApiSlice";
import { editProfileAvatarSchema } from "../../../../../../../../../../Validations/EditProfileValidation";

import Button from "../../../../../../../../../../components/Input/Button/Button";
import UploadAvatar from "../../../../../../../../../RegisterPage/components/RegisterForm/components/UploadAvatar/UploadAvatar";

import * as S from "./EditProfileAvatar.styled";

function EditProfileAvatar({ userProfile, closeSubDialog }) {
  const {
    values: editProfileAvatarForm,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      avatarFile: null,
      profileAvatarSrc: userProfile.avatar,
    },
    validationSchema: editProfileAvatarSchema,
    onSubmit,
  });

  const [uploadAvatar, { isLoading: uploadAvatarIsLoading }] = useUploadAvatarMutation();
  const [deleteAvatarImg] = useDeleteAvatarImgMutation();

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { openSnackBar } = useContext(snackBarContext);

  async function onSubmit() {
    if (editProfileAvatarForm.profileAvatarSrc) {
      let path = editProfileAvatarForm.profileAvatarSrc.split("/");
      let fileName = path[path.length - 1];
      try {
        await deleteAvatarImg({ fileName });
      } catch (err) {
        console.log(err);
      }
    }

    const formData = new FormData();
    formData.append("avatar-upload", editProfileAvatarForm.avatarFile);
    try {
      const avatarData = await uploadAvatar(formData).unwrap();
      if (!avatarData) return;

      const updatedUser = await updateUser({ avatar: avatarData.location });
      openSnackBar("success", `השינויים נשמרו`);
      closeSubDialog();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <S.EditProfileAvatarForm onSubmit={handleSubmit}>
      <UploadAvatar
        formState={editProfileAvatarForm}
        handleChange={handleChange}
        handleBlur={handleBlur}
        setFieldValue={setFieldValue}
        errors={errors}
        touched={touched}
      />

      <S.ButtonContainer>
        <Button text="שמור" color="var(--color-primary-purple)" type="submit" />
      </S.ButtonContainer>
    </S.EditProfileAvatarForm>
  );
}

export default EditProfileAvatar;
