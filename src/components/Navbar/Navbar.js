import React, { useContext } from "react";
import * as S from "./Navbar.styled";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { NavLink } from "react-router-dom";
import {
  DASHBOARD,
  CALENDER,
  CREATE_EVENT,
  NOTIFICATION,
  FAVORITES,
} from "../../routes/CONSTANTS";
import { snackBarContext } from "../../services/contexts/SnackBar";
import CustomizedSnackbar from "../Snackbar/Snackbar";
import { useGetNumberNotificationsEventsRequestsQuery } from "../../redux/slices/apiSlices/authApiSlice";
import { useSelector } from "react-redux";

import { selectIsDesktop } from "../../redux/slices/uiSlice";
import {
  selectCurrentNumberUnreadEventsRequests,
  selectCurrentNumberUnreadNotifications,
} from "../../redux/slices/authSlice";

function Navbar() {
  const { snackBarIsActive, closeSnackBar, snackBarType, snackBarMessage } =
    useContext(snackBarContext);

  const isDesktop = useSelector(selectIsDesktop);
  const numberUnreadNotification = useSelector(selectCurrentNumberUnreadNotifications);
  const numberUnreadEventsRequests = useSelector(selectCurrentNumberUnreadEventsRequests);

  // console.log(snackBarIsActive);

  return (
    <>
      <S.Container isDesktop={isDesktop}>
        <S.Navbar>
          <S.NavbarUl isDesktop={isDesktop}>
            <S.NavbarLi isDesktop={isDesktop}>
              <NavLink to={DASHBOARD}>
                <HomeOutlinedIcon sx={{ fontSize: "1.8rem" }} />
              </NavLink>
            </S.NavbarLi>
            <S.NavbarLi isDesktop={isDesktop}>
              <NavLink to={CALENDER}>
                <CalendarMonthIcon sx={{ fontSize: "1.8rem" }} />
              </NavLink>
            </S.NavbarLi>
            <S.NavbarLi isDesktop={isDesktop}>
              <NavLink to={CREATE_EVENT}>
                <AddCircleOutlineIcon sx={{ fontSize: "2.4rem" }} />
              </NavLink>
            </S.NavbarLi>
            <S.NavbarLi isDesktop={isDesktop}>
              <NavLink to={NOTIFICATION}>
                <S.IconContainer>
                  <NotificationsNoneIcon sx={{ fontSize: "1.8rem" }} />
                  {numberUnreadNotification + numberUnreadEventsRequests > 0 && (
                    <S.Counter>
                      {numberUnreadNotification + numberUnreadEventsRequests}
                    </S.Counter>
                  )}
                </S.IconContainer>
              </NavLink>
            </S.NavbarLi>
            <S.NavbarLi isDesktop={isDesktop}>
              <NavLink to={FAVORITES}>
                <FavoriteBorderIcon sx={{ fontSize: "1.8rem" }} />
              </NavLink>
            </S.NavbarLi>
          </S.NavbarUl>
        </S.Navbar>
      </S.Container>
      {snackBarIsActive && (
        <CustomizedSnackbar
          open={snackBarIsActive}
          close={closeSnackBar}
          type={snackBarType}
          message={snackBarMessage}
        />
      )}
    </>
  );
}

export default Navbar;
