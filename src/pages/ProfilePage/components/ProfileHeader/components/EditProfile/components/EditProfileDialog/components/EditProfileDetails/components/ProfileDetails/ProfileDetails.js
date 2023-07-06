import dayjs from "dayjs";
import React from "react";
import ProfileDetail from "./components/ProfileDetail/ProfileDetail";
import * as S from "./ProfileDetails.styled";

function ProfileDetails({
  userProfile: { firstName, lastName, username, city, birthday },
}) {
  return (
    <S.Container>
      <ProfileDetail label="שם מלא" text={`${firstName} ${lastName}`} />
      {/* <ProfileDetail label="שם משתמש" text={username} /> */}
      <ProfileDetail label="עיר" text={city} />
      <ProfileDetail label="תאריך לידה" text={dayjs(birthday).format("YYYY-MM-DD")} />
    </S.Container>
  );
}

export default ProfileDetails;
