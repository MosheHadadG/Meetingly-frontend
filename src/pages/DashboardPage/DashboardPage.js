import React from "react";
import SliderEvents from "../../components/SliderEvents/SliderEvents";
import * as S from "./DashboardPage.styled";
import TuneIcon from "@mui/icons-material/Tune";
import { useNavigate } from "react-router-dom";
import { INTERESTS } from "../../routes/CONSTANTS";
import { useGetEventsByTypeQuery } from "../../redux/slices/apiSlices/eventsApiSlice";
import { INTERESTS_LIST } from "../InterestsPage/utils/utils";
import { getDistance, getEventName } from "./utils/utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slices/authSlice";
import useGetUserLocation from "./hooks/useGetUserLocation";
import { userCoordsLocation } from "../../redux/slices/authSlice";
import RangeDistance from "./components/RangeDistance/RangeDistance";
import { distanceFromEvent, sortedEvents } from "../../redux/slices/eventsSlice";
import SortEvents from "./components/SortEvents/SortEvents";
import dayjs from "dayjs";
import { selectIsDesktop } from "../../redux/slices/uiSlice";

function DashboardPage() {
  const navigate = useNavigate();
  const isDesktop = useSelector(selectIsDesktop);
  const userLoggedIn = useSelector(selectCurrentUser);
  const userLocation = useSelector(userCoordsLocation);
  const userDistanceRange = useSelector(distanceFromEvent);
  const sortedEventsBy = useSelector(sortedEvents);

  const {
    data: events,
    isLoading,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useGetEventsByTypeQuery();
  useGetUserLocation();

  const renderEvents = () => {
    if (isLoading) {
      // Loading Sketelon Cards
      return userLoggedIn.interests.map((interest, idx) => {
        return (
          <S.SliderEvents key={idx}>
            <S.TitleSlider>{interest.name}</S.TitleSlider>
            <SliderEvents />
          </S.SliderEvents>
        );
      });
    } else if (isSuccess) {
      return events.map((event, idx) => {
        if (event) {
          let eventType = Object.keys(event)[0];
          let eventName = getEventName(INTERESTS_LIST, eventType);

          const eventsWithUserDistance = event[eventType].map((event) => {
            let userDistanceToEvent = getDistance(
              userLocation ? userLocation : userLoggedIn.cityCoordinates,
              event.location.coordinates
            );
            return { ...event, userDistanceToEvent };
          });

          const filteredEventsByDistance = eventsWithUserDistance.filter((event) => {
            if (event.userDistanceToEvent <= userDistanceRange) {
              return event;
            }
          });

          // Sorted Events By
          let sortedEvents;
          switch (sortedEventsBy) {
            case "date":
              const sortedEventsByDate = [...filteredEventsByDistance].sort(
                (a, b) =>
                  new Date(
                    `${dayjs(a.date).format("YYYY-MM-DD")}T${a.timeStart}`
                  ).getTime() -
                  new Date(
                    `${dayjs(b.date).format("YYYY-MM-DD")}T${b.timeStart}`
                  ).getTime()
              );
              sortedEvents =
                sortedEventsByDate.length < (isDesktop ? 5 : 3)
                  ? sortedEventsByDate.reverse()
                  : sortedEventsByDate;
              break;

            case "distance":
              const sortedEventsByDistance = [...filteredEventsByDistance].sort(
                (a, b) => a.userDistanceToEvent - b.userDistanceToEvent
              );
              sortedEvents =
                sortedEventsByDistance.length < (isDesktop ? 5 : 3)
                  ? sortedEventsByDistance.reverse()
                  : sortedEventsByDistance;
              break;
          }

          return (
            <S.SliderEvents key={idx}>
              <S.TitleSlider>
                {eventName} {`(${sortedEvents.length} תוצאות)`}
              </S.TitleSlider>
              {sortedEvents.length <= 0 ? null : <SliderEvents events={sortedEvents} />}
            </S.SliderEvents>
          );
        }
      });
    }
  };

  return (
    <S.Container isDesktop={isDesktop}>
      <S.HeaderDashboard>
        <S.TitleDashboard>אירועים לפי תחומי העניין שלך</S.TitleDashboard>
        <TuneIcon
          onClick={() => navigate(INTERESTS)}
          sx={{ color: "var(--color-primary-purple)", cursor: "pointer" }}
        />
      </S.HeaderDashboard>
      <RangeDistance
        userDistanceRange={userDistanceRange}
        userLocation={userLocation}
        userLoggedIn={userLoggedIn}
      />
      <SortEvents isDesktop={isDesktop} sortedEventsBy={sortedEventsBy} />
      <S.Events>{renderEvents()}</S.Events>
    </S.Container>
  );
}

export default DashboardPage;
