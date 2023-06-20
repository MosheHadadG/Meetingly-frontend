import React from "react";
import ErrorParagraph from "../../../../../components/Input/ErrorParagraph/ErrorParagraph";
import Input from "../../../../../components/Input/Input/Input";
import Paragraph from "../../../../../components/Input/Paragraph/Paragraph";

function VerifyEmail({
  registerForm,
  handleChange,
  handleBlur,
  errors,
  touched,
}) {
  const { otpCode, email } = registerForm;
  return (
    <>
      <Paragraph text={`הזן אותו למטה כדי לאמת את ${email}`} />
      <Input
        type="text"
        placeHolder="קוד אימות"
        name="otpCode"
        value={otpCode}
        handleChange={handleChange}
        handleBlur={handleBlur}
        error={errors.otpCode && touched.otpCode}
      />
      {errors.otpCode && touched.otpCode && (
        <ErrorParagraph text={errors.otpCode} />
      )}
    </>
  );
}

export default VerifyEmail;
