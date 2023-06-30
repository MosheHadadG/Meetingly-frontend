import React from "react";
import { useFindGroupChatQuery } from "../../../../redux/slices/apiSlices/chatApiSlice";
import EventOwnerSubHeader from "./components/EventOwnerSubHeader/EventOwnerSubHeader";
import EventParticipatingSubHeader from "./components/EventParticipatingSubHeader/EventParticipatingSubHeader";
import EventSubHeaderSkeleton from "./EventSubHeaderSkeleton";

function EventSubHeader({ event, userLoggedInIsOwnerEvent }) {
  const {
    data: groupChat,
    isLoading,
    isSuccess,
  } = useFindGroupChatQuery({ eventId: event._id });

  const renderSubHeader = () => {
    if (isLoading) {
      if (userLoggedInIsOwnerEvent) {
        return <EventSubHeaderSkeleton cardsNum={4} />;
      } else {
        return <EventSubHeaderSkeleton cardsNum={3} />;
      }
    } else if (isSuccess && groupChat.status === "success") {
      if (userLoggedInIsOwnerEvent) {
        return <EventOwnerSubHeader event={event} groupChat={groupChat} />;
      } else {
        return <EventParticipatingSubHeader groupChat={groupChat} />;
      }
    }
  };

  return renderSubHeader();
}

export default EventSubHeader;
