import React, { useEffect } from "react";
import * as S from "./HomePage.styled";
import Button from "../../components/Input/Button/Button";
import MeetinglyLogo from "../../assets/images/MeetinglyLogo.png";
import { useNavigate } from "react-router-dom";
import { LOGIN, REGISTER } from "../../routes/CONSTANTS";
import { useSelector } from "react-redux";
import { selectIsDesktop } from "../../redux/slices/uiSlice";

function HomePage() {
  const navigate = useNavigate();
  const isDesktop = useSelector(selectIsDesktop);

  return (
    <S.Container isDesktop={isDesktop}>
      <S.LogoWrapper>
        <S.Logo src={MeetinglyLogo} alt="logo" />
      </S.LogoWrapper>
      <S.TitleWelcome>ברוכים הבאים!</S.TitleWelcome>
      <S.Buttons>
        <Button
          text="הרשמה"
          color="var(--color-primary-purple)"
          handleClick={() => navigate(REGISTER)}
          type="submit"
        />

        <Button
          text="התחברות"
          color="var(--color-white)"
          fontColor="var(--color-primary-purple)"
          handleClick={() => navigate(LOGIN)}
          type="button"
        />
      </S.Buttons>
    </S.Container>
  );
}

export default HomePage;
