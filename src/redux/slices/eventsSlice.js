import { createSlice } from "@reduxjs/toolkit";
const eventsSlice = createSlice({
  name: "events",
  initialState: {
    distanceFromEvent: 20,
    sortedEventsBy: "date",
    userEventsTypeWithPage: {},
    searchTerm: "",
  },
  reducers: {
    setDistanceFromEvent: (state, action) => {
      const { distance } = action.payload;
      state.distanceFromEvent = distance;
    },
    setSortedEventsBy: (state, action) => {
      const { sortedEventsBy } = action.payload;
      state.sortedEventsBy = sortedEventsBy;
    },
    setUserEventsTypeWithPage: (state, action) => {
      const { eventsType, page } = action.payload;
      state.userEventsTypeWithPage = {
        ...state.userEventsTypeWithPage,
        [eventsType]: page,
      };
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  setDistanceFromEvent,
  setSortedEventsBy,
  setUserEventsTypeWithPage,
  setSearchTerm,
} = eventsSlice.actions;
export default eventsSlice.reducer;

export const distanceFromEvent = (state) => state.events.distanceFromEvent;
export const sortedEvents = (state) => state.events.sortedEventsBy;
export const userEventsTypesWithPage = (state) => state.events.userEventsTypeWithPage;
export const selectSearchTerm = (state) => state.events.searchTerm;
