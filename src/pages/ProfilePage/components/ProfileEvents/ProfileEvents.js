import React from "react";
import * as S from "./ProfileEvents.styled";
import EventsByOwner from "./components/EventsByOwner/EventsByOwner";
import EventsParticipated from "./components/EventsParticipated/EventsParticipated";

function ProfileEvents({ userProfile, isUserLoggedInProfile }) {
  const { firstName, _id: profileId } = userProfile;

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
      </S.Events>
    </S.Container>
  );
}

export default ProfileEvents;
