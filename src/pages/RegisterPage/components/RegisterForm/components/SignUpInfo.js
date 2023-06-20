import React from "react";
import ErrorParagraph from "../../../../../components/Input/ErrorParagraph/ErrorParagraph";
import Input from "../../../../../components/Input/Input/Input";

function SignUpInfo({ registerForm, handleChange, handleBlur, errors, touched }) {
  const { username, email, confirmEmail, password, confirmPassword } = registerForm;

  return (
    <>
      <Input
        type="text"
        placeHolder="שם משתמש"
        name="username"
        value={username}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.username && touched.username}
      />
      {errors.username && touched.username && <ErrorParagraph text={errors.username} />}
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
        type="text"
        placeHolder="אימות אימייל"
        name="confirmEmail"
        value={confirmEmail}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.confirmEmail && touched.confirmEmail}
      />
      {errors.confirmEmail && touched.confirmEmail && (
        <ErrorParagraph text={errors.confirmEmail} />
      )}
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
      <Input
        type="password"
        placeHolder="אימות סיסמה"
        name="confirmPassword"
        value={confirmPassword}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.confirmPassword && touched.confirmPassword}
      />
      {errors.confirmPassword && touched.confirmPassword && (
        <ErrorParagraph text={errors.confirmPassword} />
      )}
    </>
  );
}

export default SignUpInfo;
