import React from "react";
import * as S from "./LoginPage.styled";
import Button from "../../components/Input/Button/Button";
import MeetinglyLogo from "../../assets/images/MeetinglyLogo.png";
import LoginForm from "./components/LoginForm/LoginForm";

import Paragraph from "../../components/Input/Paragraph/Paragraph";

import { PASSWORD_REST, REGISTER } from "../../routes/CONSTANTS";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useSelector } from "react-redux";
import { selectIsDesktop } from "../../redux/slices/uiSlice";

function LoginPage() {
  const navigate = useNavigate();
  const isDesktop = useSelector(selectIsDesktop);

  return (
    <S.Container isDesktop={isDesktop}>
      <S.LogoWrapper>
        <S.Logo src={MeetinglyLogo} alt="logo" />
      </S.LogoWrapper>
      <S.LoginFormContainer>
        <LoginForm />
      </S.LoginFormContainer>

      <S.LoginPageFooter>
        {/* <Paragraph
          handleClick={() => navigate(PASSWORD_REST)}
          margin="0 0 50px 0"
          text="שכחתי סיסמה"
          link={true}
          fontColor={"#47434d"}
          fontSize={"1.1rem"}
          icon={<ChevronLeftIcon />}
        /> */}

        <Paragraph text="עדיין אין לך חשבון?" fontSize={"1.2rem"} fontColor={"#47434d"} />
        <Button
          text="הרשם"
          color="var(--color-white)"
          fontColor="var(--color-primary-purple)"
          width={"60%"}
          handleClick={() => navigate(REGISTER)}
        />
      </S.LoginPageFooter>
    </S.Container>
  );
}

export default LoginPage;
