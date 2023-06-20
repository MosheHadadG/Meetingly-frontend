import React, { useContext, useEffect, useState } from "react";
import CustomizedDialog from "../../../../../../components/Dialog/Dialog";
import { dialogContext } from "../../../../../../services/contexts/Dialog";
import { subDialogContext } from "../../../../../../services/contexts/SubDialog";
import UploadEventCoverImg from "../../../../../CreateEventPage/CreateEventForm/components/UploadEventCoverImg/UploadEventCoverImg";
import EventDescription from "../../../EventDescription/EventDescription";
import EventDetails from "../../../EventDetails/EventDetails";
import EventHeader from "../../../EventHeader/EventHeader";
import EditEventCover from "./components/EditEventCover/EditEventCover";
import EditEventDescription from "./components/EditEventDescription/EditEventDescription";
import EditEventDetails from "./components/EditEventDetails/EditEventDetails";
import EditSection from "./components/EditSection/EditSection";
import * as S from "./EditEvent.styled";

function EditEvent({ event }) {
  const { openSubDialog, closeSubDialog, subDialogDetails, setUpdatedSubDialogContent } =
    useContext(subDialogContext);

  // const updateSubDialogContent = () => {
  //   switch (subDialogDetails.dialogId) {
  //     case "EditEventCover":
  //       setUpdatedSubDialogContent(<EditEventCover event={event} />);
  //       break;

  //     case "EditEventDetails":
  //       setUpdatedSubDialogContent(<EditEventDetails event={event} />);
  //       break;
  //   }
  // };

  // useEffect(() => {
  //   if (event) {
  //     updateSubDialogContent();
  //   }
  // }, [event]);

  return (
    <S.Container>
      <EditSection
        title={"תמונת נושא"}
        content={<EventHeader imageSrc={event.imageSrc} />}
        handleClick={() =>
          openSubDialog({
            title: "ערוך תמונת נושא",
            content: <EditEventCover event={event} closeSubDialog={closeSubDialog} />,
            type: "componentContent",
            id: "EditEventCover",
          })
        }
      />

      <EditSection
        title={"פרטי האירוע"}
        content={
          <EventDetails
            privacy={event.privacy}
            date={event.date}
            timeStart={event.timeStart}
            timeEnd={event.timeEnd}
            placeName={event.location.name}
          />
        }
        handleClick={() =>
          openSubDialog({
            title: "ערוך פרטי אירוע",
            content: <EditEventDetails event={event} closeSubDialog={closeSubDialog} />,
            type: "componentContent",
            // action: "שמור שינויים",
            id: "EditEventDetails",
            // callback: () => submitForm(),
          })
        }
      />

      <EditSection
        title={"תיאור האירוע"}
        content={<EventDescription description={event.description} />}
        handleClick={() =>
          openSubDialog({
            title: "ערוך את תיאור האירוע",
            content: (
              <EditEventDescription event={event} closeSubDialog={closeSubDialog} />
            ),
            type: "componentContent",
            // action: "שמור שינויים",
            id: "EditEventDescription",
            // callback: () => submitForm(),
          })
        }
      />
    </S.Container>
  );
}

export default EditEvent;
