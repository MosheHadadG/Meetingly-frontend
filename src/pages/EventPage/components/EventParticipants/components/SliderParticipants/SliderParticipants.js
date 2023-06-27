import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick-pnth";

import { sliderSettings } from "./sliderSetting";
import AvatarParticipant from "../AvatarParticipant/AvatarParticipant";
import "./ReactSlick.css";

function SliderParticipants({ participants, isRemoveParticipantsMode, setParticipants }) {
  function handleRemoveParticipant(participantId) {
    console.log(participantId);
    const updatedParticipants = participants.filter(
      (participant) => participant._id !== participantId
    );
    setParticipants(updatedParticipants);
  }

  function renderAvatarParticipants() {
    const renderedAvatarParticipants = participants.map((participant) => {
      return (
        <AvatarParticipant
          key={participant.username}
          participant={participant}
          isRemoveParticipantsMode={isRemoveParticipantsMode}
          handleRemoveParticipant={handleRemoveParticipant}
        />
      );
    });
    return renderedAvatarParticipants;
  }

  return <Slider {...sliderSettings}>{renderAvatarParticipants()}</Slider>;
}

export default SliderParticipants;
