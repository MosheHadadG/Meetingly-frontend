import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  useDeleteNotificationByIdMutation,
  useMarkAsReadNotificationMutation,
} from "../../../../../../redux/slices/apiSlices/notificationsApiSlice";
import { authApiSlice } from "../../../../../../redux/slices/apiSlices/authApiSlice";
import { useDispatch } from "react-redux";
import { setNotificationPage } from "../../../../../../redux/slices/authSlice";

export default function NotificationCardSettings({ notificationId, isRead }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [markAsReadNotification, { isLoading }] = useMarkAsReadNotificationMutation();
  const [deleteNotificationById] = useDeleteNotificationByIdMutation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch();

  const markAsRead = async () => {
    try {
      const markAsReadData = await markAsReadNotification(notificationId);

      if (markAsReadData?.data?.status === "success") {
        dispatch(
          authApiSlice.util.updateQueryData(
            "getUserNotifications",
            undefined,
            (cacheNotifications) => {
              let notificationIndex = cacheNotifications.notifications.findIndex(
                (notification) => notification._id === notificationId
              );
              let notificationUpdated =
                cacheNotifications.notifications[notificationIndex];
              notificationUpdated.isRead = true;
              cacheNotifications.notifications.splice(
                notificationIndex,
                1,
                notificationUpdated
              );
            }
          )
        );
      }

      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNotification = async () => {
    try {
      const deleteNotificationData = await deleteNotificationById(notificationId);

      if (deleteNotificationData?.data?.status === "success") {
        dispatch(
          authApiSlice.util.updateQueryData(
            "getUserNotifications",
            undefined,
            (cacheNotifications) => {
              // dispatch(
              //   authApiSlice.endpoints.getUserNotifications.initiate(
              //     { page: 1 },
              //     { forceRefetch: true }
              //   )
              // );
              // dispatch(setNotificationPage(1));
              let notificationsUpdated = cacheNotifications.notifications.filter(
                (notification) => notification._id !== notificationId
              );
              cacheNotifications.notifications = notificationsUpdated;
            }
          )
        );
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
        {!isRead && <MenuItem onClick={markAsRead}>סמן כנקרא</MenuItem>}
        <MenuItem onClick={deleteNotification}>מחק התראה</MenuItem>
      </Menu>
    </div>
  );
}
