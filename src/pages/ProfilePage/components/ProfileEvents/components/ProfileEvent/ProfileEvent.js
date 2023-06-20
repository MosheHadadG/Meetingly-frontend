import React from "react";
import * as S from "./ProfileEvent.styled";
import SliderEvents from "../../../../../../components/SliderEvents/SliderEvents";

function ProfileEvent({ title, events, eventsNoFound }) {
  return (
    <S.Container>
      <S.TitleSlider>{title}</S.TitleSlider>
      {eventsNoFound ? null : <SliderEvents events={events} />}
    </S.Container>
  );
}

export default ProfileEvent;
