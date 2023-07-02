import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import * as S from "./App.styled";
import RoutesConfig from "./routes/RoutesConfig";
import Spinner from "./components/Spinner/Spinner";
import { dialogContext } from "./services/contexts/Dialog";
import CustomizedDialog from "./components/Dialog/Dialog";
import { subDialogContext } from "./services/contexts/SubDialog";
import { config } from "./Constants";
import "./utils/timeAgo/he";
import {
  setIsLoading,
  selectCurrentToken,
  setCredentials,
  setSocket,
  selectCurrentSocket,
  setUpdatedUser,
  isLoggedIn,
  setOnlineUsers,
} from "./redux/slices/authSlice";
import { useLoadUserQuery } from "./redux/slices/apiSlices/authApiSlice";
import useGetNumberNotifications from "./hooks/useGetNumberNotifications";
import useGetNotificationsSocket from "./hooks/useGetNotificationsSocket";
import useGetEventsRequestsNotificationsSocket from "./hooks/useGetEventsRequestsNotificationsSocket";
import useIsDesktop from "./hooks/useIsDesktop";
import useGetNumberUnreadMessages from "./hooks/useGetNumberUnreadMessages";
import useGetMessagesSocket from "./hooks/useGetMessagesSocket";

function App() {
  const dispatch = useDispatch();

  const token = useSelector(selectCurrentToken);
  const socket = useSelector(selectCurrentSocket);
  const userLoggedIn = useSelector(isLoggedIn);

  const { closeDialog, dialogIsActive, dialogDetails } = useContext(dialogContext);
  const { closeSubDialog, subDialogIsActive, subDialogDetails } =
    useContext(subDialogContext);

  const { data: userData, isLoading: loadUserIsLoading } = useLoadUserQuery(
    "LoadUserOnRefresh",
    {
      skip: !token,
    }
  );

  useGetNumberNotifications({ userLoggedIn });
  useGetNumberUnreadMessages({ userLoggedIn });
  useGetNotificationsSocket({ socket, userLoggedIn });
  useGetEventsRequestsNotificationsSocket({ socket, userLoggedIn });
  useGetMessagesSocket({ socket, userLoggedIn });
  useIsDesktop();

  useEffect(() => {
    if (token) {
      dispatch(setIsLoading());
    }
  }, []);

  useEffect(() => {
    if (userData && token && !userLoggedIn) {
      // user is not logged in and the information about him has arrived.
      dispatch(setCredentials({ user: userData.user, token }));
      dispatch(setSocket(io(config.url.SOCKET_URL)));
    } else if (userData && userLoggedIn) {
      // user is logged in and the information about him has changed.
      dispatch(setUpdatedUser(userData.user));
    }
  }, [userData, userLoggedIn]);

  useEffect(() => {
    if (socket && userData) {
      socket.emit("newSocketUser", {
        userId: userData.user._id,
        username: userData.user.username,
      });
      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
    }
  }, [socket, userData]);

  return (
    <S.Container>
      {loadUserIsLoading ? (
        <Spinner />
      ) : (
        <>
          <RoutesConfig />

          {dialogIsActive && (
            <CustomizedDialog
              open={dialogIsActive}
              closeDialog={closeDialog}
              callback={dialogDetails.dialogCallback}
              title={dialogDetails.dialogTitle}
              content={dialogDetails.dialogContent}
              action={dialogDetails.dialogAction}
              type={dialogDetails.dialogType}
              isFullScreenMobile={dialogDetails.isFullScreenMobile}
              // errMsg={errMsg}
            />
          )}

          {subDialogIsActive && (
            <CustomizedDialog
              open={subDialogIsActive}
              closeDialog={closeSubDialog}
              callback={subDialogDetails.dialogCallback}
              title={subDialogDetails.dialogTitle}
              content={subDialogDetails.dialogContent}
              action={subDialogDetails.dialogAction}
              type={subDialogDetails.dialogType}
              isFullScreenMobile={subDialogDetails.isFullScreenMobile}
              // errMsg={errMsg}
            />
          )}
        </>
      )}
    </S.Container>
  );
}

export default App;
