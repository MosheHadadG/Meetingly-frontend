import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as S from "./EditProfileDetails.styled";
import Spinner from "../../../../../../../../components/Spinner/Spinner";
import UploadEventCoverImg from "../../../../../../../CreateEventPage/CreateEventForm/components/UploadEventCoverImg/UploadEventCoverImg";
import { useUpdateEventMutation } from "../../../../../../../../redux/slices/apiSlices/eventsApiSlice";
import Input from "../../../../../../../../components/Input/Input/Input";
import ErrorParagraph from "../../../../../../../../components/Input/ErrorParagraph/ErrorParagraph";
import EventPrivacy from "../../../../../../../CreateEventPage/CreateEventForm/components/EventPrivacy/EventPrivacy";
import dayjs from "dayjs";
import EventPlace from "../../../../../../../CreateEventPage/CreateEventForm/components/EventPlace/EventPlace";
import Button from "../../../../../../../../components/Input/Button/Button";
// import { snackBarContext } from "../../../../../../../../services/contexts/snackBar";

import { snackBarContext } from "../../../../../../../../services/contexts/SnackBar";
import UserCity from "../../../../../../../RegisterPage/components/RegisterForm/components/UserCity/UserCity";
import { useUpdateUserMutation } from "../../../../../../../../redux/slices/apiSlices/authApiSlice";
function EditProfileDetails({ userProfile, closeSubDialog }) {
  const {
    values: editProfileDetailsForm,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      username: userProfile.username,
      city: userProfile.city,
      cityCoordinates: userProfile.cityCoordinates,
      birthday: userProfile.birthday,
    },
    // validationSchema: editEventDetailsSchema,
    onSubmit,
  });

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  // const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const { openSnackBar } = useContext(snackBarContext);

  async function onSubmit() {
    console.log(editProfileDetailsForm);

    try {
      const updatedUser = await updateUser(editProfileDetailsForm);

      openSnackBar("success", `השינויים נשמרו`);
      closeSubDialog();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <S.EditProfileDetailsForm onSubmit={handleSubmit}>
      <S.EditProfileDetailsFormInputs>
        <Input
          type="text"
          placeHolder="שם פרטי"
          name="firstName"
          value={editProfileDetailsForm.firstName}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.firstName && touched.firstName}
        />
        {errors.firstName && touched.firstName && (
          <ErrorParagraph text={errors.firstName} />
        )}

        <Input
          type="text"
          placeHolder="שם משפחה"
          name="lastName"
          value={editProfileDetailsForm.lastName}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.lastName && touched.lastName}
        />
        {errors.lastName && touched.lastName && <ErrorParagraph text={errors.lastName} />}

        {/* <Input
          type="text"
          placeHolder="שם משתמש"
          name="username"
          value={editProfileDetailsForm.username}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.username && touched.username}
        />
        {errors.username && touched.username && <ErrorParagraph text={errors.username} />} */}

        <Input
          type="date"
          placeHolder="תאריך לידה"
          name="birthday"
          // boxShadow
          // onFocus={(e) => (e.target.type = "date")}

          value={dayjs(editProfileDetailsForm.birthday).format("YYYY-MM-DD")}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.birthday && touched.birthday}
        />
        {errors.birthday && touched.birthday && <ErrorParagraph text={errors.birthday} />}

        <UserCity
          city={editProfileDetailsForm.city}
          formState={editProfileDetailsForm}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
          touched={touched}
          errors={errors}
        />

        <S.ButtonContainer>
          <Button
            text="שמור שינויים"
            color="var(--color-primary-purple)"
            type="submit"
            // boxShadow
          />
        </S.ButtonContainer>
      </S.EditProfileDetailsFormInputs>
    </S.EditProfileDetailsForm>
  );

  // );
}

export default EditProfileDetails;
