import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick-pnth";

import { useNavigate } from "react-router-dom";
import AvatarSkeleton from "../AvatarSkleton/AvatarSkeleton";
import dayjs from "dayjs";
import { sliderSettings } from "./sliderSetting";
import { Avatar } from "@mui/material";
import AvatarParticipant from "../AvatarParticipant/AvatarParticipant";
import "./ReactSlick.css";

function SliderParticipants({
  participants,
  isRemoveParticipantsMode,
  setParticipants,
  setRemovedParticipants,
}) {
  const navigate = useNavigate();
  // const renderParticipants = () => {
  //   console.log("here");
  //   if (participants) {
  //     return <Slider {...sliderSettings}>{renderAvatarParticipants()}</Slider>;
  //   } else {
  //     return <Slider {...sliderSettings}>{renderAvatarSkeleton()}</Slider>;
  //   }
  // };

  // function renderAvatarSkeleton() {
  //   return Array(5)
  //     .fill(0)
  //     .map((_, idx) => {
  //       return <AvatarSkeleton key={idx} />;
  //     });
  // }

  function handleRemoveParticipant(participantId) {
    console.log(participantId);
    const updatedParticipants = participants.filter(
      (participant) => participant._id !== participantId
    );
    setParticipants(updatedParticipants);
    // setRemovedParticipants([...removedParticipants, participantId])
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
