import React, { useState } from "react";
import { useGetEventsByOwnerIdQuery } from "../../../../../../redux/slices/apiSlices/eventsApiSlice";
import ProfileEvent from "../ProfileEvent/ProfileEvent";

function EventsByOwner({ isUserLoggedInProfile, firstName, profileId }) {
  const {
    data: eventsByOwner,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEventsByOwnerIdQuery(profileId);
  const [noFoundMsg, setNoFoundMsg] = useState();

  const renderEventsByOwner = () => {
    if (isLoading) {
      return (
        <ProfileEvent
          title={isUserLoggedInProfile ? "אירועים שיצרתי" : `אירועים ש${firstName} יצר`}
        />
      );
    } else if (isSuccess) {
      if (eventsByOwner.status === "NoFound") {
        return (
          <ProfileEvent
            title={
              isUserLoggedInProfile
                ? `אירועים שיצרתי (0 תוצאות)`
                : `אירועים ש${firstName} יצר (0 תוצאות) `
            }
            eventsNoFound
          />
        );
      }

      const sortedEventsByDate = [...eventsByOwner].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      return (
        <ProfileEvent
          title={
            isUserLoggedInProfile
              ? `אירועים שיצרתי (${eventsByOwner.length} תוצאות)`
              : `אירועים ש${firstName} יצר (${eventsByOwner.length} תוצאות) `
          }
          events={sortedEventsByDate}
        />
      );
    } else if (isError) {
      // if (error.originalStatus === 404) {
      //   return (
      //     <ProfileEvent
      //       title={
      //         isUserLoggedInProfile
      //           ? `אירועים שיצרתי (0 תוצאות)`
      //           : `אירועים ש${firstName} יצר (0 תוצאות) `
      //       }
      //       eventsNoFound
      //     />
      //   );
      // }
    }
  };

  return renderEventsByOwner();
}

export default EventsByOwner;
