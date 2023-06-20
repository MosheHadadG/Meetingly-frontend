import * as React from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { cssVar } from "./utils/utils";
import "moment/locale/he";

import * as S from "./ScheduleEvents.styled";
import "./ScheduleEventsMui.css";
import AppointmentTooltipContent from "./AppointmentTooltip/AppointmentTooltipContent";

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: cssVar("--color-primary-purple"),
    },
  },
});

function ScheduleEvents({ events }) {
  console.log(events);
  return (
    <S.Container>
      <ThemeProvider theme={theme}>
        <S.Scheduler>
          <Paper>
            <Scheduler data={events} locale={"he"}>
              <ViewState defaultCurrentDate={new Date()} />
              <MonthView />
              <Toolbar />
              <DateNavigator />
              <TodayButton messages={{ today: "היום" }} />
              <Appointments />
              <AppointmentTooltip
                showCloseButton
                contentComponent={AppointmentTooltipContent}
              />
            </Scheduler>
          </Paper>
        </S.Scheduler>
      </ThemeProvider>
    </S.Container>
  );
}

export default ScheduleEvents;
