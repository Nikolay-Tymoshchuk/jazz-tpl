import $ from 'jquery';
import { slick } from 'slick-carousel';

const clientsSlider = $('[data-clients-slider]');

clientsSlider.slick({
  mobileFirst: true,
  lazyLoad: 'ondemand',
  arrows: false,
  dots: false,
  autoplay: true,
  adaptiveHeight: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '0',

  initialSlide: 1,

  autoplaySpeed: 3000,
  speed: 1000,
  cssEase: 'ease-in-out',

  infinite: true,

  responsive: [
    {
      breakpoint: 424,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        initialSlide: 2,
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 5,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 1439,
      settings: 'unslick',
    },
  ],
});
