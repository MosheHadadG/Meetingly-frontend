import dayjs from "dayjs";

export const getEventName = (interestsList, eventType) => {
  const interestObj = interestsList.find((interest) => {
    return eventType.includes(interest.type);
  });
  return interestObj.name;
};

// Converts numeric degrees to radians
const toRad = (Value) => {
  return (Value * Math.PI) / 180;
};

export const getDistance = (coordsUser, coordsEvent) => {
  const { lng: lngUser, lat: latUser } = coordsUser;
  const [lngEvent, latEvent] = coordsEvent;

  const R = 6371; // km
  const dLat = toRad(latEvent - latUser);
  const dLon = toRad(lngEvent - lngUser);
  const lat1 = toRad(latUser);
  const lat2 = toRad(latEvent);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distanceKm = R * c;
  return distanceKm;
};

export const filteredEventsByTerm = ({ events, searchTerm }) => {
  return events.filter((event) => {
    return event.title.includes(searchTerm);
  });
};

export const filteredEventsByDistance = ({ events, userDistanceRange }) => {
  return events.filter((event) => {
    if (event.userDistanceToEvent <= userDistanceRange) {
      return event;
    }
  });
};

export const getSortedEvents = ({ events, sortedEventsBy, isDesktop }) => {
  // Sorted Events By

  switch (sortedEventsBy) {
    case "date":
      const sortedEventsByDate = [...events].sort(
        (a, b) =>
          new Date(`${dayjs(a.date).format("YYYY-MM-DD")}T${a.timeStart}`).getTime() -
          new Date(`${dayjs(b.date).format("YYYY-MM-DD")}T${b.timeStart}`).getTime()
      );

      return sortedEventsByDate.length < (isDesktop ? 5 : 3)
        ? sortedEventsByDate.reverse()
        : sortedEventsByDate;

    case "distance":
      const sortedEventsByDistance = [...events].sort(
        (a, b) => a.userDistanceToEvent - b.userDistanceToEvent
      );

      return sortedEventsByDistance.length < (isDesktop ? 5 : 3)
        ? sortedEventsByDistance.reverse()
        : sortedEventsByDistance;
  }
};
