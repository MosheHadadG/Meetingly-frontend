import dayjs from "dayjs";

export const userAlreadyRequestedToJoin = (userEventsRequests, eventId) =>
  userEventsRequests.includes(eventId);

export const userAlreadyParticipatingEvent = (participants, userLoggedInId) =>
  participants.filter((participant) => participant._id === userLoggedInId).length > 0;

export const eventAlreadyOver = (date, timeStart) => {
  return (
    new Date(`${dayjs(date).format("YYYY-MM-DD")}T${timeStart}`).getTime() <
    new Date().getTime()
  );
};

export const UserLoggedInIsOwnerEvent = (userLoggedInId, ownerEventId) =>
  userLoggedInId === ownerEventId;

export const getDifferenceArrayObjects = (array1, array2) => {
  return array1.filter((object1) => {
    return !array2.some((object2) => {
      return object1._id === object2._id;
    });
  });
};
