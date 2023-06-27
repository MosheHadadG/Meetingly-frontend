import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { useDispatch } from "react-redux";
import { useMarkAsReadAllNotificationsMutation } from "../../../../redux/slices/apiSlices/notificationsApiSlice";
import { setNotificationPage } from "../../../../redux/slices/authSlice";
import { authApiSlice } from "../../../../redux/slices/apiSlices/authApiSlice";

export default function NotificationsSettings({ isRead }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [markAsReadAllNotifications, { isLoading }] =
    useMarkAsReadAllNotificationsMutation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch();

  const markAsRead = async () => {
    try {
      const markAsReadData = await markAsReadAllNotifications();
      if (markAsReadData?.data?.status === "success") {
        dispatch(
          authApiSlice.endpoints.getUserNotifications.initiate(
            { page: 1 },
            { forceRefetch: true }
          )
        );
        dispatch(setNotificationPage(1));
      }
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MoreHorizIcon
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
        <MenuItem onClick={markAsRead}>סמן הכל כנקרא</MenuItem>
      </Menu>
    </div>
  );
}
