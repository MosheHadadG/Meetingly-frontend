import React from "react";
import { useGetEventsUserParticipatedQuery } from "../../../../../../redux/slices/apiSlices/eventsApiSlice";
import ProfileEvent from "../ProfileEvent/ProfileEvent";

function EventsParticipated({ isUserLoggedInProfile, firstName, profileId }) {
  const {
    data: EventsParticipated,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetEventsUserParticipatedQuery(profileId);

  const renderEventsParticipated = () => {
    if (isLoading) {
      return (
        <ProfileEvent
          title={
            isUserLoggedInProfile ? "אירועים שהשתתפתי" : `אירועים ש${firstName} השתתף`
          }
        />
      );
    } else if (isSuccess) {
      if (EventsParticipated.status === "NoFound") {
        return (
          <ProfileEvent
            title={
              isUserLoggedInProfile
                ? `אירועים שהשתתפתי (0 תוצאות)`
                : `אירועים ש${firstName} השתתף (0 תוצאות) `
            }
            eventsNoFound
          />
        );
      }

      const sortedEventsByDate = [...EventsParticipated].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      return (
        <ProfileEvent
          title={
            isUserLoggedInProfile
              ? `אירועים שהשתתפתי (${EventsParticipated.length} תוצאות)`
              : `אירועים ש${firstName} השתתף (${EventsParticipated.length} תוצאות) `
          }
          events={sortedEventsByDate}
        />
      );
    }
    // } else if (isError) {
    //   if (error.originalStatus === 404) {
    //     return (
    //       <ProfileEvent
    //         title={
    //           isUserLoggedInProfile
    //             ? `אירועים שיצרתי (0 תוצאות)`
    //             : `אירועים ש${firstName} יצר (0 תוצאות) `
    //         }
    //         eventsNoFound
    //       />
    //     );
    //   }
    // }
  };

  return renderEventsParticipated();
}

export default EventsParticipated;
