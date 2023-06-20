import React from "react";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";

function AppointmentTooltipContent({ appointmentData, ...restProps }) {
  return (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
      {/* <div style={{ height: "100px" }}>
        <i>a</i>
        <p>
          <img src={"model.appointmentData.img"} style={{ height: "80px" }} />
        </p>
      </div> */}
    </AppointmentTooltip.Content>
  );
}
export default AppointmentTooltipContent;
