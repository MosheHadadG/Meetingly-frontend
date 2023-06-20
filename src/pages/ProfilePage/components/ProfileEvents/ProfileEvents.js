import React from "react";
import * as S from "./ProfileEvents.styled";
import ProfileEvent from "./components/ProfileEvent/ProfileEvent";
import { useGetEventsByOwnerIdQuery } from "../../../../redux/slices/apiSlices/eventsApiSlice";
import Spinner from "../../../../components/Spinner/Spinner";
import EventsByOwner from "./components/EventsByOwner/EventsByOwner";
import EventsParticipated from "./components/EventsParticipated/EventsParticipated";

function ProfileEvents({
  userProfile: { firstName, _id: profileId },
  isUserLoggedInProfile,
}) {
  return (
    <S.Container>
      <S.Events>
        <EventsByOwner
          isUserLoggedInProfile={isUserLoggedInProfile}
          profileId={profileId}
          firstName={firstName}
        />
        <EventsParticipated
          isUserLoggedInProfile={isUserLoggedInProfile}
          profileId={profileId}
          firstName={firstName}
        />
        {/* <ProfileEvent title="אירועים שהשתתפתי" events={sports} /> */}
      </S.Events>
    </S.Container>
  );
}

export default ProfileEvents;
