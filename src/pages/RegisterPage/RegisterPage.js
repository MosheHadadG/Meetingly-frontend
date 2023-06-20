import React, { useContext } from "react";
import { registrationContext } from "../../services/contexts/Registeration";

import RegisterForm from "./components/RegisterForm/RegisterForm";
import RegisterProgressBar from "./components/RegisterProgressBar/RegisterProgressBar";
import MeetinglyLogo from "../../assets/images/MeetinglyLogo.png";
import * as S from "./RegisterPage.styled";
import { useSelector } from "react-redux";
import { selectIsDesktop } from "../../redux/slices/uiSlice";

function RegisterPage() {
  const { step, setStep } = useContext(registrationContext);
  const isDesktop = useSelector(selectIsDesktop);

  return (
    <S.Container isDesktop={isDesktop}>
      <RegisterProgressBar step={step} />
      <S.LogoWrapper>
        <S.Logo src={MeetinglyLogo} alt="logo" />
      </S.LogoWrapper>
      <S.RegisterFormContainer>
        <RegisterForm step={step} setStep={setStep} />
      </S.RegisterFormContainer>
    </S.Container>
  );
}

export default RegisterPage;
