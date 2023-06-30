import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as S from "./EventsRequestsPage.styled";
import RequestCard from "./components/NotificationCard/RequestCard";
import RequestCardSkeleton from "./components/NotificationCard/RequestCardSkeleton";

import {
  authApiSlice,
  useGetUserEventsRequestsQuery,
} from "../../redux/slices/apiSlices/authApiSlice";
import {
  selectCurrentEventsRequestsPage,
  increaseEventsRequestsPage,
  setTotalEventsRequests,
  setEventsRequestsPage,
  selectMakeEventsRequestsRefetch,
  setMakeEventsRequestsRefetch,
  selectTotalEventsRequests,
} from "../../redux/slices/authSlice";
import { selectIsDesktop } from "../../redux/slices/uiSlice";
import { EVENTS_REQUESTS } from "../../routes/CONSTANTS";
import useInfintyScroll from "../../hooks/useInfintyScroll";

const options = {
  root: null,
  rootMargin: "0px 0px -150px 0px",
  threshold: 0,
};

function EventsRequestsPage({ fromNotificationsPage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const eventsRequestsPage = useSelector(selectCurrentEventsRequestsPage);
  const makeEventsRequestsRefetch = useSelector(selectMakeEventsRequestsRefetch);
  const totalEventsRequests = useSelector(selectTotalEventsRequests);
  const isDesktop = useSelector(selectIsDesktop);

  const { setLastElement } = useInfintyScroll({
    increasePage: increaseEventsRequestsPage,
    options,
    skip: fromNotificationsPage,
  });

  const {
    data: eventsRequestsData,
    isSuccess,
    isFetching,
  } = useGetUserEventsRequestsQuery(
    { page: eventsRequestsPage },
    { skip: makeEventsRequestsRefetch }
  );

  // Update total events requests
  useEffect(() => {
    if (eventsRequestsData?.status === "NoFound") {
      dispatch(setTotalEventsRequests(null));
    } else if (eventsRequestsData && !totalEventsRequests) {
      dispatch(setTotalEventsRequests(eventsRequestsData.totalEventsRequests));
    }
  }, [eventsRequestsData]);

  // make Refetch if user made a decicion and coponent did unmount.
  useEffect(() => {
    if (makeEventsRequestsRefetch) {
      dispatch(
        authApiSlice.endpoints.getUserEventsRequests.initiate(
          { page: 1 },
          { subscribe: false, forceRefetch: true }
        )
      );
      dispatch(setMakeEventsRequestsRefetch(false));
      dispatch(setEventsRequestsPage(1));
    }
  }, [makeEventsRequestsRefetch]);

  const renderEventsRequests = () => {
    if (isSuccess && eventsRequestsData?.status === "success") {
      const { eventsRequests } = eventsRequestsData;

      if (fromNotificationsPage) {
        if (isFetching) return null;
        return (
          <RequestCard
            request={eventsRequests[0]}
            withoutBoxShadow
            fromNotificationsPage={fromNotificationsPage}
          />
        );
      } else {
        return eventsRequests.map((eventRequest) => (
          <RequestCard
            requestRef={setLastElement}
            key={eventRequest._id}
            request={eventRequest}
          />
        ));
      }
    }
  };

  const renderEventsRequestsSkeleton = () => {
    if (isFetching) {
      if (fromNotificationsPage) {
        return <RequestCardSkeleton withoutBoxShadow />;
      } else {
        return Array(eventsRequestsPage === 1 ? 10 : 2)
          .fill(0)
          .map((_, idx) => <RequestCardSkeleton key={idx} />);
      }
    }
  };

  return (
    <S.Container isDesktop={isDesktop} fromNotificationsPage={fromNotificationsPage}>
      <S.RequestsHeader>
        <S.RequestsTitle>בקשות לאירועים</S.RequestsTitle>

        {fromNotificationsPage ? (
          <S.RequestsShowAll onClick={() => navigate(EVENTS_REQUESTS)}>
            הצג הכל {totalEventsRequests && `(${totalEventsRequests} בקשות)`}
          </S.RequestsShowAll>
        ) : (
          <S.TotalEventsRequests>
            {totalEventsRequests && ` סה"כ (${totalEventsRequests} בקשות)`}
          </S.TotalEventsRequests>
        )}
      </S.RequestsHeader>

      {eventsRequestsData?.status === "NoFound" ? (
        <S.NoFoundParagraph>{eventsRequestsData.statusMessage}</S.NoFoundParagraph>
      ) : (
        <>
          {renderEventsRequests()}
          {renderEventsRequestsSkeleton()}
        </>
      )}
    </S.Container>
  );
}

export default EventsRequestsPage;
