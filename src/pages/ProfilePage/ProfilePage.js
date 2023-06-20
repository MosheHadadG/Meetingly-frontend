import React, { useEffect, useState } from "react";
import * as S from "./ProfilePage.styled";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { useGetUserByUsernameQuery } from "../../redux/slices/apiSlices/authApiSlice";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slices/authSlice";
import { isUserLoggedInProfile } from "./utils/profile.utils";
import ProfileEvents from "./components/ProfileEvents/ProfileEvents";
import { selectIsDesktop } from "../../redux/slices/uiSlice";

function ProfilePage() {
  const { username } = useParams();
  const {
    data: userProfile,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserByUsernameQuery(username);
  const userLoggedIn = useSelector(selectCurrentUser);
  const isDesktop = useSelector(selectIsDesktop);

  const renderProfile = () => {
    if (isLoading) {
      return <Spinner />;
    } else if (isSuccess) {
      return (
        <>
          <ProfileHeader
            userProfile={userProfile}
            isUserLoggedInProfile={isUserLoggedInProfile(
              userLoggedIn._id,
              userProfile._id
            )}
          />
          <ProfileEvents
            userProfile={userProfile}
            isUserLoggedInProfile={isUserLoggedInProfile(
              userLoggedIn._id,
              userProfile._id
            )}
          />
          {/* <EventDetails date={date} time={time} place={place} />
            <EventDescription description={description} />
            <EventOwner />
            <EventParticipants /> */}
        </>
      );
    }
  };

  return <S.Container isDesktop={isDesktop}>{renderProfile()}</S.Container>;
}

export default ProfilePage;
