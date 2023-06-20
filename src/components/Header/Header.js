import React from "react";
import Paragraph from "../Input/Paragraph/Paragraph";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MeetinglyLogo from "../../assets/images/MeetinglyLogo.png";
import * as S from "./Header.styled";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { DASHBOARD } from "../../routes/CONSTANTS";
import Avatar from "@mui/material/Avatar";
import UserMenu from "./components/UserMenu/UserMenu";

function Header() {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.NavBarContainer>
        <S.UserWelcome>
          <S.AvatarContainer>
            <Avatar
              alt={user.firstName}
              src={user.avatar}
              sx={{ width: 38, height: 38 }}
              // onClick={() => navigate(`/profile/${user.username}`)}
            />
            <S.UserMenuArrow>
              <UserMenu username={user.username} />
            </S.UserMenuArrow>
          </S.AvatarContainer>

          <Paragraph
            text={`היי, ${user.firstName} ${user.lastName}`}
            justifyContent="flex-start"
          />
        </S.UserWelcome>
        <S.LogoWrapper>
          <S.Logo onClick={() => navigate(DASHBOARD)} src={MeetinglyLogo} alt="logo" />
        </S.LogoWrapper>
      </S.NavBarContainer>
    </S.Container>
  );
}

export default Header;
