let slider = $('#js-slider');
let slider2 = $('#js-slider-2');
let blogSlider = $('#js-blog-slider');
slider.slick({
  dots: true,
  infinite: true,
  slidesToShow: 1,
  fade: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000
});
slider2.slick({
  dots: true,
  infinite: true,
  slidesToShow: 1,
  fade: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000
});
blogSlider.slick({
  lazyLoad: 'ondemand',
  dots: false,
  speed: 400,
  prevArrow: $('.blog__arrow--prev'),
  nextArrow: $('.blog__arrow--next'),
  mobileFirst: true,
  responsive: [{
    breakpoint: 600,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1
    }
  }, {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }]
});