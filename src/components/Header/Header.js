import React from "react";
import Paragraph from "../Input/Paragraph/Paragraph";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MeetinglyLogo from "../../assets/images/MeetinglyLogo.png";
import * as S from "./Header.styled";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slices/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { CHAT, DASHBOARD } from "../../routes/CONSTANTS";
import Avatar from "@mui/material/Avatar";
import UserMenu from "./components/UserMenu/UserMenu";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { selectNumberUnreadChatsData } from "../../redux/slices/chatSlice";

function Header() {
  const user = useSelector(selectCurrentUser);
  const totalUnreadChatsData = useSelector(selectNumberUnreadChatsData);
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
            />
            <S.UserMenuArrow>
              <UserMenu username={user.username} />
            </S.UserMenuArrow>
          </S.AvatarContainer>

          <S.ChatIconContainer onClick={() => navigate(CHAT)}>
            <MessageOutlinedIcon sx={{ fontSize: "1.6rem" }} />
            {totalUnreadChatsData?.totalUnreadChats > 0 && (
              <S.Counter>{totalUnreadChatsData?.totalUnreadChats}</S.Counter>
            )}
          </S.ChatIconContainer>
        </S.UserWelcome>
        <S.LogoWrapper>
          <S.Logo onClick={() => navigate(DASHBOARD)} src={MeetinglyLogo} alt="logo" />
        </S.LogoWrapper>
      </S.NavBarContainer>
    </S.Container>
  );
}

export default Header;
