import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import moment from "moment";
import "moment/locale/he";

const localizer = momentLocalizer(moment);

const initialDate = `${new Date().getFullYear().toString()}-0${(
  new Date().getMonth() + 1
).toString()}`;

function CalendarEvents() {
  const [date, setDate] = useState(initialDate);
  return (
    <div className="calender-container">
      <div className="calender-main">
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          date={date}
          onNavigate={(date) => {
            setDate(date);
          }}
          messages={{
            next: `הבא`,
            previous: `אחורה`,
            today: `נוכחי`,
            month: `חודש`,
            week: `שבוע`,
            day: `יום`,
            // agenda: `${t("Toolbar.agenda")}`,
          }}
          // onSelectEvent={handleClickEvent}
        />
      </div>
    </div>
  );
}

export default CalendarEvents;
