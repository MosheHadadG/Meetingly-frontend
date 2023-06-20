import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import Button from "../../../../components/Input/Button/Button";
import PersonalInfo from "./components/PersonalInfo";
import SignUpInfo from "./components/SignUpInfo";
import VerifyEmail from "./components/VerifyEmail";

import {
  userSchemaPersonalInfo,
  userSchemaSignUpInfo,
  userSchemaUploadAvatar,
  userSchemaVerifyEmail,
} from "../../../../Validations/RegisterValidation";
import * as S from "./RegisterForm.styled";
import {
  useCreateUserMutation,
  useUploadAvatarMutation,
  useUserVerifyOtpMutation,
} from "../../../../redux/slices/apiSlices/authApiSlice";
import { LOGIN } from "../../../../routes/CONSTANTS";
import ErrorParagraph from "../../../../components/Input/ErrorParagraph/ErrorParagraph";
import Paragraph from "../../../../components/Input/Paragraph/Paragraph";
import UploadAvatar from "./components/UploadAvatar/UploadAvatar";
import Spinner from "../../../../components/Spinner/Spinner";

function RegisterForm({ step, setStep }) {
  const {
    values: registerForm,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      birthday: "",
      city: "",
      gender: "",
      avatar: "",
      avatarFile: null,
      username: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      otpCode: "",
    },
    validationSchema: switchUserSchema(),
    onSubmit,
  });
  const [createUser, { isLoading: createUserIsLoading }] = useCreateUserMutation();
  const [uploadAvatar, { isLoading: uploadAvatarIsLoading }] = useUploadAvatarMutation();
  const [userVerifyOtp, { isLoading: userVerifyOtpIsLoading }] =
    useUserVerifyOtpMutation();
  const [userPendingVerification, setUserPendingVerification] = useState();
  const [errMsg, setErrMsg] = useState("");
  const [successRegisterMsg, setSuccessRegisterMsg] = useState();
  const navigate = useNavigate();

  function switchUserSchema() {
    switch (step) {
      case 0:
        return userSchemaPersonalInfo;
      case 1:
        return userSchemaUploadAvatar;
      case 2:
        return userSchemaSignUpInfo;
      case 3:
        return userSchemaVerifyEmail;
      default:
        return;
    }
  }

  const formTitles = ["פרטים אישיים", "העלה תמונת פרופיל", "הרשמה", "שלחנו לך קוד"];

  async function onSubmit(values, actions) {
    if (isUploadAvatarStep()) {
      handleUploadAvatar();
    } else if (isSignUpStep()) {
      userSignUpSendOtp();
    } else if (isLastStep()) {
      userVerifyOtpCode();
    } else {
      handleFormNext();
      actions.setTouched({});
    }
  }
  async function handleUploadAvatar() {
    const { avatarFile } = registerForm;
    if (!avatarFile) return;
    if (registerForm.avatar) return handleFormNext();

    const formData = new FormData();
    formData.append("avatar-upload", avatarFile);
    try {
      const avatarData = await uploadAvatar(formData).unwrap();
      if (!avatarData) return;
      setFieldValue("avatar", avatarData.location);
      setErrMsg("");
      handleFormNext();
    } catch (err) {
      if (err.status === 400) {
        setErrMsg(err.data.error);
      } else {
        setErrMsg("תקלה בשרתים שלנו");
      }
    }
  }

  async function userSignUpSendOtp() {
    const {
      firstName,
      lastName,
      birthday,
      city,
      cityCoordinates,
      gender,
      avatar,
      username,
      email,
      password,
    } = registerForm;
    const userRegisterForm = {
      firstName,
      lastName,
      birthday,
      gender,
      avatar,
      city,
      cityCoordinates,
      username,
      email,
      password,
    };

    try {
      const userPending = await createUser(userRegisterForm).unwrap();
      if (!userPending) return;
      setUserPendingVerification(userPending);
      setErrMsg("");
      handleFormNext();
    } catch (err) {
      if (err.status === 400) {
        setErrMsg(err.data.error);
      } else {
        setErrMsg("תקלה בשרתים שלנו");
      }
    }
  }

  async function userVerifyOtpCode() {
    const userOtpVerification = {
      userId: userPendingVerification.data.userId,
      otp: registerForm.otpCode,
    };
    try {
      const verifyUser = await userVerifyOtp(userOtpVerification).unwrap();
      if (!verifyUser) return;
      setErrMsg("");
      setSuccessRegisterMsg(verifyUser.message);
      setTimeout(() => {
        navigate(LOGIN);
      }, 1000);
    } catch (err) {
      if (err.status === 400) {
        setErrMsg(err.data.error);
      } else {
        setErrMsg("תקלה בשרתים שלנו");
      }
    }
  }

  function handleFormNext() {
    setStep((currStep) => currStep + 1);
  }

  function handleFormPrev() {
    setStep((currStep) => currStep - 1);
  }

  function isLastStep() {
    return step === formTitles.length - 1;
  }

  function isSignUpStep() {
    return step === formTitles.length - 2;
  }

  function isUploadAvatarStep() {
    return step === formTitles.length - 3;
  }

  const formStep = () => {
    switch (step) {
      case 0:
        return (
          <PersonalInfo
            registerForm={registerForm}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
          />
        );
      case 1:
        return (
          <UploadAvatar
            formState={registerForm}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
          />
        );
      case 2:
        return (
          <SignUpInfo
            registerForm={registerForm}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
          />
        );
      case 3:
        return (
          <VerifyEmail
            registerForm={registerForm}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
          />
        );
      default:
        return;
    }
  };

  return createUserIsLoading || uploadAvatarIsLoading || userVerifyOtpIsLoading ? (
    <Spinner />
  ) : (
    <S.RegisterForm onSubmit={handleSubmit} autoComplete="off">
      <S.TitleForm>{formTitles[step]}</S.TitleForm>
      {formStep()}
      {errMsg && <ErrorParagraph text={errMsg} />}
      {successRegisterMsg && <Paragraph text={successRegisterMsg} />}
      <S.Buttons>
        {step !== 0 && (
          <Button
            text="אחורה"
            color="var(--color-white)"
            fontColor="var(--color-primary-purple)"
            handleClick={handleFormPrev}
            type="button"
          />
        )}
        <Button
          text={isLastStep() ? "הרשם" : "שמור והמשך"}
          color="var(--color-primary-purple)"
          type="submit"
        />
      </S.Buttons>
    </S.RegisterForm>
  );
}

export default RegisterForm;
