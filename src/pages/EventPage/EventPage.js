import React, { useCallback, useEffect, useMemo } from "react";
import Paragraph from "../../components/Input/Paragraph/Paragraph";
import EventDetail from "./components/EventDetails/components/EventDetail/EventDetail";
import * as S from "./EventPage.styled";
import { useParams } from "react-router-dom";
import { useGetEventByIdQuery } from "../../redux/slices/apiSlices/eventsApiSlice";
import Spinner from "../../components/Spinner/Spinner";
import EventDetails from "./components/EventDetails/EventDetails";
import EventHeader from "./components/EventHeader/EventHeader";
import EventDescription from "./components/EventDescription/EventDescription";
import EventOwner from "./components/EventOwner/EventOwner";
import EventParticipants from "./components/EventParticipants/EventParticipants";
import EventJoining from "./components/EventJoining/EventJoining";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slices/authSlice";
import EventCancelParticipation from "./components/EventCancelParticipation/EventCancelParticipation";
import {
  eventAlreadyOver,
  userAlreadyRequestedToJoin,
  userAlreadyParticipatingEvent,
  UserLoggedInIsOwnerEvent,
} from "./utils/eventPage.utils";
import EventOwnerSubHeader from "./components/EventOwnerSubHeader/components/EventOwnerSubHeader/EventOwnerSubHeader";
import { selectIsDesktop } from "../../redux/slices/uiSlice";
import EventSubHeader from "./components/EventOwnerSubHeader/EventSubHeader";

function EventPage() {
  const { eventId } = useParams();
  const userLoggedIn = useSelector(selectCurrentUser);

  const { data: eventsData, isLoading, isSuccess } = useGetEventByIdQuery(eventId);

  const isDesktop = useSelector(selectIsDesktop);

  const renderEvent = () => {
    if (isLoading) {
      return <Spinner />;
    } else if (isSuccess) {
      const { event, eventOwnerDetails } = eventsData;
      const {
        title,
        imageSrc,
        location,
        timeStart,
        timeEnd,
        date,
        description,
        privacy,
        participants,
        ownerEvent: ownerEventId,
        _id: eventId,
      } = event;
      const { username, avatar } = eventOwnerDetails;
      return (
        <>
          <EventHeader title={title} imageSrc={imageSrc} isDesktop={isDesktop} />

          {(UserLoggedInIsOwnerEvent(userLoggedIn._id, ownerEventId) ||
            userAlreadyParticipatingEvent(participants, userLoggedIn._id)) && (
            <EventSubHeader
              event={event}
              userLoggedInIsOwnerEvent={UserLoggedInIsOwnerEvent(
                userLoggedIn._id,
                ownerEventId
              )}
            />
          )}

          <EventDetails
            privacy={privacy}
            date={date}
            timeStart={timeStart}
            timeEnd={timeEnd}
            placeName={location.name}
          />
          <EventDescription description={description} />
          <EventOwner username={username} avatar={avatar} />
          <EventParticipants participants={participants} />
          {!eventAlreadyOver(date, timeStart) &&
            !UserLoggedInIsOwnerEvent(userLoggedIn._id, ownerEventId) && (
              <>
                {privacy === "private" &&
                userAlreadyRequestedToJoin(userLoggedIn.eventsRequests, eventId) ? (
                  <p>בקשה לאירוע זה הועברה ליוזם האירוע</p>
                ) : (
                  <>
                    {userAlreadyParticipatingEvent(participants, userLoggedIn._id) ? (
                      <EventCancelParticipation title={title} eventId={eventId} />
                    ) : (
                      <EventJoining privacy={privacy} title={title} eventId={eventId} />
                    )}
                  </>
                )}
              </>
            )}
        </>
      );
    }
  };
  return <S.Container isDesktop={isDesktop}>{renderEvent()}</S.Container>;
}

export default EventPage;
