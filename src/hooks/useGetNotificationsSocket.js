import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authApiSlice } from "../redux/slices/apiSlices/authApiSlice";
import { setNotificationPage } from "../redux/slices/authSlice";

const useGetNotificationsSocket = ({ socket, userLoggedIn }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userLoggedIn) return;

    socket?.on("getNotification", (notificationData) => {
      dispatch(
        authApiSlice.util.updateQueryData(
          "getUserNotifications",
          undefined,
          (cacheNotifications) => {
            if (!cacheNotifications.notifications) {
              dispatch(
                authApiSlice.endpoints.getUserNotifications.initiate(
                  { page: 1 },
                  { forceRefetch: true }
                )
              );
              console.log("here");
              dispatch(setNotificationPage(1));
            } else {
              cacheNotifications.notifications.unshift(notificationData.notification);
            }
          }
        )
      );
      if (notificationData.type === "requestDecision") {
        dispatch(authApiSlice.util.invalidateTags(["User", "Event"]));
      }
      if (notificationData.type === "ParticipantsEventChanged") {
        dispatch(authApiSlice.util.invalidateTags(["Event"]));
      }
      dispatch(authApiSlice.util.invalidateTags(["NotificationsCounter"]));
    });
  }, [socket, userLoggedIn]);

  return;
};

export default useGetNotificationsSocket;
