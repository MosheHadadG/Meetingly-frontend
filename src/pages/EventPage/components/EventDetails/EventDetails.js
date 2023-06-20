import React from "react";
import * as S from "./EventDetails.styled";
import EventDetail from "./components/EventDetail/EventDetail";
import PublicIcon from "@mui/icons-material/Public";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import dayjs from "dayjs";
import moment from "moment";
import "moment/locale/he";

function EventDetails({ date, timeStart, timeEnd, placeName, privacy }) {
  return (
    <S.Container>
      {privacy === "public" ? (
        <EventDetail
          text={"אירוע ציבורי"}
          icon={<PublicIcon sx={{ color: "var(--color-primary-purple)" }} />}
        />
      ) : (
        <EventDetail
          text={"אירוע פרטי"}
          icon={<GroupIcon sx={{ color: "var(--color-primary-purple)" }} />}
        />
      )}

      <EventDetail
        text={`יום ${moment(date).format("dddd")}, ${dayjs(date).format("DD/MM/YYYY")}`}
        icon={<CalendarMonthIcon sx={{ color: "var(--color-primary-purple)" }} />}
      />
      <EventDetail
        text={`${timeStart} - ${timeEnd}`}
        icon={<AccessTimeIcon sx={{ color: "var(--color-primary-purple)" }} />}
      />
      <EventDetail
        text={placeName}
        icon={<PlaceIcon sx={{ color: "var(--color-primary-purple)" }} />}
      />
    </S.Container>
  );
}

export default EventDetails;
