import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as S from "./EditProfileAvatar.styled";
import Spinner from "../../../../../../../../components/Spinner/Spinner";
import UploadAvatar from "../../../../../../../RegisterPage/components/RegisterForm/components/UploadAvatar/UploadAvatar";
import { useUpdateEventMutation } from "../../../../../../../../redux/slices/apiSlices/eventsApiSlice";
import { editEventCoverSchema } from "../../../../../../../../Validations/EditEventValidation";
import { snackBarContext } from "../../../../../../../../services/contexts/SnackBar";
import {
  useDeleteAvatarImgMutation,
  useUpdateUserMutation,
  useUploadAvatarMutation,
} from "../../../../../../../../redux/slices/apiSlices/authApiSlice";
import Button from "../../../../../../../../components/Input/Button/Button";
import { editProfileAvatarSchema } from "../../../../../../../../Validations/EditProfileValidation";
import ErrorParagraph from "../../../../../../../../components/Input/ErrorParagraph/ErrorParagraph";

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
    console.log(editProfileAvatarForm);

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
      //   if (err.status === 400) {
      //     setErrMsg(err.data.error);
      //   } else {
      //     setErrMsg("תקלה בשרתים שלנו");
      //   }
      // }
    }
  }

  console.log("here");
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
        <Button
          text="שמור"
          color="var(--color-primary-purple)"
          type="submit"

          // boxShadow
        />
      </S.ButtonContainer>
    </S.EditProfileAvatarForm>
  );
}

export default EditProfileAvatar;
