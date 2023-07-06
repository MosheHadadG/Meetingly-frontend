import React, { useContext } from "react";
import { useFormik } from "formik";
import { snackBarContext } from "../../../../../../../../../../services/contexts/SnackBar";
import { useUpdateUserMutation } from "../../../../../../../../../../redux/slices/apiSlices/authApiSlice";
import { editProfileBioSchema } from "../../../../../../../../../../Validations/EditProfileValidation";

import TextArea from "../../../../../../../../../../components/Input/TextArea/TextArea";
import Button from "../../../../../../../../../../components/Input/Button/Button";
import ErrorParagraph from "../../../../../../../../../../components/Input/ErrorParagraph/ErrorParagraph";

import * as S from "./EditProfileBio.styled";

function EditProfileBio({ userProfile, closeSubDialog }) {
  const {
    values: editProfileBioForm,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      bio: userProfile.bio,
    },
    validationSchema: editProfileBioSchema,
    onSubmit,
  });

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { openSnackBar } = useContext(snackBarContext);

  async function onSubmit() {
    try {
      const updatedUser = await updateUser({ bio: editProfileBioForm.bio });

      openSnackBar("success", `השינויים נשמרו`);
      closeSubDialog();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <S.EditProfileBioForm onSubmit={handleSubmit}>
      <S.EditProfileBioFormInputs>
        <TextArea
          placeHolder="תאר את עצמך..."
          name="bio"
          value={editProfileBioForm.bio}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.bio && touched.bio}
        />
        {errors.bio && touched.bio && <ErrorParagraph text={errors.bio} />}

        <S.ButtonContainer>
          <Button text="שמור שינויים" color="var(--color-primary-purple)" type="submit" />
        </S.ButtonContainer>
      </S.EditProfileBioFormInputs>
    </S.EditProfileBioForm>
  );
}

export default EditProfileBio;
