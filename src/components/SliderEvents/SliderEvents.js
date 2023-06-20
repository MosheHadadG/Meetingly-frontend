import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick-pnth";

import { useNavigate } from "react-router-dom";
import * as S from "./SliderEvents.styled";
import CardSkeleton from "../../pages/DashboardPage/components/Card/CardSkeleton";
import dayjs from "dayjs";
import CardEvent from "../../pages/DashboardPage/components/Card/Card";
import { sliderSettings } from "./sliderSetting";
import "./ReactSlick.css";
import { useSelector } from "react-redux";
import { selectIsDesktop } from "../../redux/slices/uiSlice";

function SliderEvents({ events }) {
  const navigate = useNavigate();
  const isDesktop = useSelector(selectIsDesktop);

  const renderEvents = () => {
    if (events) {
      return (
        <Slider arrows={isDesktop && true} {...sliderSettings}>
          {renderCardEvents()}
        </Slider>
      );
    } else {
      return <Slider {...sliderSettings}>{renderCardSkeleton(5)}</Slider>;
    }
  };

  function renderCardSkeleton(cardsNum) {
    return Array(cardsNum)
      .fill(0)
      .map((_, idx) => {
        return <CardSkeleton key={idx} />;
      });
  }

  function renderCardEvents() {
    const renderedCardEvents = events.map((event) => {
      return (
        <CardEvent
          key={event._id}
          eventId={event._id}
          imageSrc={event.imageSrc}
          title={event.title}
          alt={`${event.title}`}
          place={event.location.name}
          date={dayjs(event.date).format("DD/MM/YYYY")}
          time={event.timeStart}
          clickedEvent={() => navigate(`/events/${event.type}/${event._id}`)}
        />
      );
    });
    return renderedCardEvents;
  }

  return <S.Container>{renderEvents()}</S.Container>;
}

export default SliderEvents;
