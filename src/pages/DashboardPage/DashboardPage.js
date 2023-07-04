import React from "react";
import SliderEvents from "../../components/SliderEvents/SliderEvents";
import * as S from "./DashboardPage.styled";
import TuneIcon from "@mui/icons-material/Tune";
import { useNavigate } from "react-router-dom";
import { INTERESTS } from "../../routes/CONSTANTS";
import { useGetEventsByTypeQuery } from "../../redux/slices/apiSlices/eventsApiSlice";
import { INTERESTS_LIST } from "../InterestsPage/utils/utils";
import {
  filteredEventsByDistance,
  filteredEventsByTerm,
  getDistance,
  getEventName,
  getSortedEvents,
} from "./utils/utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slices/authSlice";
import useGetUserLocation from "./hooks/useGetUserLocation";
import { userCoordsLocation } from "../../redux/slices/authSlice";
import RangeDistance from "./components/RangeDistance/RangeDistance";
import SearchIcon from "@mui/icons-material/Search";
import {
  distanceFromEvent,
  selectSearchTerm,
  sortedEvents,
} from "../../redux/slices/eventsSlice";
import SortEvents from "./components/SortEvents/SortEvents";
import { selectIsDesktop } from "../../redux/slices/uiSlice";
import { useState } from "react";

function DashboardPage() {
  const navigate = useNavigate();
  const isDesktop = useSelector(selectIsDesktop);
  const userLoggedIn = useSelector(selectCurrentUser);
  const userLocation = useSelector(userCoordsLocation);
  const userDistanceRange = useSelector(distanceFromEvent);
  const sortedEventsBy = useSelector(sortedEvents);
  const searchTerm = useSelector(selectSearchTerm);

  const {
    data: eventsByType,
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
      return eventsByType.map((eventByType, idx) => {
        if (eventByType) {
          let eventType = Object.keys(eventByType)[0];
          let eventName = getEventName(INTERESTS_LIST, eventType);

          const eventsWithUserDistance = eventByType[eventType].map((event) => {
            let userDistanceToEvent = getDistance(
              userLocation ? userLocation : userLoggedIn.cityCoordinates,
              event.location.coordinates
            );
            return { ...event, userDistanceToEvent };
          });

          const eventsByTerm = filteredEventsByTerm({
            events: eventsWithUserDistance,
            searchTerm,
          });
          const eventsByDistance = filteredEventsByDistance({
            events: eventsByTerm,
            userDistanceRange,
          });

          const sortedEvents = getSortedEvents({
            events: eventsByDistance,
            sortedEventsBy,
            isDesktop,
          });

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

      {/* <S.SearchContainer> */}
      {/* <SearchIcon /> */}

      {/* <S.SearchInput
          placeholder="חפש..."
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
        /> */}
      {/* </S.SearchContainer> */}

      {/* <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> */}
      <SortEvents isDesktop={isDesktop} sortedEventsBy={sortedEventsBy} />
      <S.Events>{renderEvents()}</S.Events>
    </S.Container>
  );
}

export default DashboardPage;
