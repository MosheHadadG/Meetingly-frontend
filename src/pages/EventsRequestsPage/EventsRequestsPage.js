import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInfintyScroll from "../../hooks/useInfintyScroll";
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
  isLoading,
  selectCurrentSocket,
} from "../../redux/slices/authSlice";
import * as S from "./EventsRequestsPage.styled";
import RequestCard from "./components/NotificationCard/RequestCard";
import RequestCardSkeleton from "./components/NotificationCard/RequestCardSkeleton";
import { EVENTS_REQUESTS } from "../../routes/CONSTANTS";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { selectIsDesktop } from "../../redux/slices/uiSlice";

const options = {
  root: null,
  rootMargin: "0px 0px -150px 0px",
  thresold: 0,
};

function EventsRequestsPage({ fromNotificationsPage }) {
  const eventsRequestsPage = useSelector(selectCurrentEventsRequestsPage);
  const makeEventsRequestsRefetch = useSelector(selectMakeEventsRequestsRefetch);
  const totalEventsRequests = useSelector(selectTotalEventsRequests);
  const { setLastElement } = useInfintyScroll({
    increasePage: increaseEventsRequestsPage,
    options,
    skip: fromNotificationsPage,
  });

  const {
    data: eventsRequestsData,
    isSuccess,
    isFetching,
    isLoading,
    refetch,
    isError,
    error,
  } = useGetUserEventsRequestsQuery(
    { page: eventsRequestsPage },
    { skip: makeEventsRequestsRefetch }
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [noFoundMsg, setNoFoundMsg] = useState(null);

  const socket = useSelector(selectCurrentSocket);
  const isDesktop = useSelector(selectIsDesktop);

  // update total events requests
  useEffect(() => {
    if (eventsRequestsData?.status === "NoFound") {
      dispatch(setTotalEventsRequests(null));
    } else if (eventsRequestsData && !totalEventsRequests) {
      console.log(eventsRequestsData);
      dispatch(setTotalEventsRequests(eventsRequestsData.totalEventsRequests));
    }
  }, [eventsRequestsData]);

  useEffect(() => {
    // make Refetch if user made a decicion and coponent did unmount.
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
    if (isSuccess) {
      if (eventsRequestsData.status === "success") {
        const { eventsRequests } = eventsRequestsData;

        switch (!!fromNotificationsPage) {
          case true:
            if (isFetching) return null;
            return (
              <RequestCard
                request={eventsRequests[0]}
                withoutBoxShadow
                fromNotificationsPage={fromNotificationsPage}
              />
            );

          case false:
            return eventsRequests.map((eventRequest, idx) => {
              return (
                <RequestCard
                  requestRef={setLastElement}
                  key={eventRequest._id}
                  request={eventRequest}
                />
              );
            });
        }
      }
    } else if (isError) {
      if (error.originalStatus === 404) {
        console.log(error.data);
        // setNoFoundMsg(error.data);
      }
    }
  };

  const renderrenderEventsRequestsSkeleton = () => {
    if (isFetching) {
      switch (!!fromNotificationsPage) {
        case true:
          return <RequestCardSkeleton withoutBoxShadow />;

        case false:
          return Array(eventsRequestsPage === 1 ? 10 : 2)
            .fill(0)
            .map((_, idx) => {
              return <RequestCardSkeleton key={idx} />;
            });
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
          {renderrenderEventsRequestsSkeleton()}
        </>
      )}
    </S.Container>
  );
}

export default EventsRequestsPage;
