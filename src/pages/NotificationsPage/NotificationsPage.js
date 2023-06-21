import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInfintyScroll from "../../hooks/useInfintyScroll";
import { useGetUserNotificationsQuery } from "../../redux/slices/apiSlices/notificationsApiSlice";
import {
  selectCurrentNotificationsPage,
  increaseNotificationPage,
} from "../../redux/slices/authSlice";
import EventsRequestsPage from "../EventsRequestsPage/EventsRequestsPage";
import NotificationCard from "./components/NotificationCard/NotificationCard";
import NotificationCardSkeleton from "./components/NotificationCard/NotificationCardSkeleton";
import * as S from "./NotificationsPage.styled";
import NotificationsSettings from "./components/NotificationsSettings/NotificiationsSettings";
import { selectIsDesktop } from "../../redux/slices/uiSlice";

const options = {
  root: null,
  rootMargin: "0px 0px -150px 0px",
  thresold: 0,
};

function NotificationsPage() {
  const notificiationsPage = useSelector(selectCurrentNotificationsPage);
  const { setLastElement } = useInfintyScroll({
    increasePage: increaseNotificationPage,
    options,
  });
  const {
    data: notificationsData,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useGetUserNotificationsQuery({ page: notificiationsPage });

  const isDesktop = useSelector(selectIsDesktop);

  const renderNotifications = () => {
    if (isSuccess) {
      if (notificationsData.status === "success") {
        const { notifications } = notificationsData;
        return notifications.map((notification, idx) => {
          return (
            <NotificationCard
              notificationRef={setLastElement}
              key={idx}
              notification={notification}
            />
          );
        });
      }
    } else if (isError) {
      if (error.originalStatus === 404) {
        console.log(error.data);
      }
    }
  };

  const renderNotificationsSkeleton = () => {
    if (isFetching) {
      return Array(notificiationsPage === 1 ? 10 : 2)
        .fill(0)
        .map((_, idx) => {
          return <NotificationCardSkeleton key={idx} />;
        });
    }
  };

  return (
    <S.Container isDesktop={isDesktop}>
      <EventsRequestsPage fromNotificationsPage />
      <S.NotificationsWrapper>
        <S.NotificationsHeader>
          <S.NotificationsTitle>התראות</S.NotificationsTitle>
          <S.NotificationsSettings>
            <NotificationsSettings />
          </S.NotificationsSettings>
        </S.NotificationsHeader>
        {notificationsData?.status === "NoFound" ? (
          <S.NoFoundParagraph>{notificationsData.statusMessage}</S.NoFoundParagraph>
        ) : (
          <>
            {renderNotifications()}
            {renderNotificationsSkeleton()}
          </>
        )}
      </S.NotificationsWrapper>
    </S.Container>
  );
}

export default NotificationsPage;
