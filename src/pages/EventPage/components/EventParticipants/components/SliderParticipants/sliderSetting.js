export const sliderSettings = {
  dots: false,
  arrows: false,
  initialSlide: 0,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  infinite: false,
  rtl: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5.5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3.5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 380,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 1,
      },
    },
  ],
};
