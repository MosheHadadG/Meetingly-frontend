import React from "react";
import Spinner from "../../components/Spinner/Spinner";
import { useGetEventsUserParticipateQuery } from "../../redux/slices/apiSlices/authApiSlice";
import CalendarEvents from "./components/CalendarEvents/CalendarEvents";
import ScheduleEvents from "./components/CalendarEvents/ScheduleEvents/ScheduleEvents";
import dayjs from "dayjs";
import * as S from "./CalendarPage.styled";
import { selectIsDesktop } from "../../redux/slices/uiSlice";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
function CalendarPage() {
  const {
    data: eventsUserParticipate,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEventsUserParticipateQuery();
  const isDesktop = useSelector(selectIsDesktop);

  const renderCalenderWithEvents = () => {
    if (isLoading) {
      return <Spinner />;
    } else if (isSuccess) {
      const eventsToScheduleFormat = eventsUserParticipate.map((event) => {
        return {
          startDate: `${dayjs(event.date).format("YYYY-MM-DD")}T${event.timeStart}`,
          endDate: `${dayjs(event.date).format("YYYY-MM-DD")}T${event.timeEnd}`,
          title: (
            <NavLink
              style={{ textDecoration: "none" }}
              to={`/events/${event.type}/${event._id}`}
            >
              {event.title}
            </NavLink>
          ),
        };
      });
      return <ScheduleEvents events={eventsToScheduleFormat} />;

      // return (
      //   <>
      //     <EventHeader title={title} imageSrc={imageSrc} />
      //     <EventDetails
      //       privacy={privacy}
      //       date={date}
      //       time={time}
      //       place={place}
      //     />
      //     <EventDescription description={description} />
      //     <EventOwner username={username} avatar={avatar} />
      //     <EventParticipants participantsIds={participants} />
      //     <EventFooter privacy={privacy} />
      //   </>
      // );
    }
  };
  return <S.Container isDesktop={isDesktop}>{renderCalenderWithEvents()}</S.Container>;
}

export default CalendarPage;
