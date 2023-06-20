import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useDispatch } from "react-redux";
import { useMarkAsReadAllNotificationsMutation } from "../../../../redux/slices/apiSlices/notificationsApiSlice";
import {
  logOut,
  setNotificationPage,
  userLogout,
} from "../../../../redux/slices/authSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { apiSlice } from "../../../../api/apiSlice";

export default function UserMenu({ username }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToProfile = () => {
    handleClose();
    navigate(`profile/${username}`);
  };

  const logout = () => {
    dispatch(userLogout());
    // rest all cache
    dispatch(apiSlice.util.resetApiState());
  };

  return (
    <div>
      <ArrowDropDownIcon
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={navigateToProfile}>הפרופיל שלי</MenuItem>
        <MenuItem onClick={logout}>התנתק</MenuItem>
      </Menu>
    </div>
  );
}
