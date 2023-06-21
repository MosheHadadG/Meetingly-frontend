import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import { userLoginSchema } from "../../../../Validations/LoginValidation";

import ErrorParagraph from "../../../../components/Input/ErrorParagraph/ErrorParagraph";
import Input from "../../../../components/Input/Input/Input";
import Button from "../../../../components/Input/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./LoginForm.styled";
import { useLoginMutation } from "../../../../redux/slices/apiSlices/authApiSlice";
import {
  selectCurrentUser,
  setCredentials,
  setSocket,
  setUpdatedUser,
} from "../../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { INTERESTS, DASHBOARD } from "../../../../routes/CONSTANTS";
import { useUpdateUserMutation } from "../../../../redux/slices/apiSlices/authApiSlice";
import { io } from "socket.io-client";
import { config } from "../../../../Constants";

function LoginForm() {
  const {
    values: loginForm,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userLoginSchema,
    onSubmit,
  });
  const [login, { isLoading }] = useLoginMutation();
  const [updateUser] = useUpdateUserMutation();
  const [errMsg, setErrMsg] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit() {
    try {
      const userData = await login(loginForm).unwrap();
      const { user, token } = userData;
      dispatch(setCredentials({ user, token }));
      dispatch(setSocket(io(config.url.SOCKET_URL)));
      if (userData.user.firstTimeUser) {
        await updateUser({ firstTimeUser: false });
        navigate(INTERESTS);
      } else {
        navigate(DASHBOARD);
      }
    } catch (err) {
      console.log(err?.data?.error);
      if (err.status === 400) {
        setErrMsg(err.data.error);
      } else {
        console.log(err.status);
        setErrMsg("תקלה בשרתים שלנו");
      }
    }
  }

  const { email, password } = loginForm;
  return (
    <S.LoginForm onSubmit={handleSubmit}>
      <Input
        type="text"
        placeHolder="אימייל"
        name="email"
        value={email}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.email && touched.email}
      />
      {errors.email && touched.email && <ErrorParagraph text={errors.email} />}

      <Input
        type="password"
        placeHolder="סיסמה"
        name="password"
        value={password}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.password && touched.password}
      />
      {errors.password && touched.password && <ErrorParagraph text={errors.password} />}

      {errMsg && <ErrorParagraph textAlign="center" text={errMsg} />}
      <S.ButtonContainer>
        <Button text="כניסה" color="var(--color-primary-purple)" type="submit" />
      </S.ButtonContainer>
    </S.LoginForm>
  );
}

export default LoginForm;
