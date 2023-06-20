import React, { useState } from "react";
import SliderEvents from "../../../../components/SliderEvents/SliderEvents";

import { useGetFavoriteEventsQuery } from "../../../../redux/slices/apiSlices/eventsApiSlice";

function FavoriteEvents() {
  const {
    data: favcriteEventsData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetFavoriteEventsQuery();
  const [noFoundMsg, setNoFoundMsg] = useState();

  const renderEventsByOwner = () => {
    if (isLoading) {
      // Skeleton
      return <SliderEvents />;
    } else if (isSuccess) {
      return <SliderEvents events={favcriteEventsData.favoriteEvents} />;
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

export default FavoriteEvents;
