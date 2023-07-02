export const sliderSettings = {
  dots: false,
  initialSlide: 0,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
  infinite: false,
  rtl: true,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3.5,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 380,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};
