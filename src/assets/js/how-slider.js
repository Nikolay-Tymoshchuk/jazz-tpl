import $ from 'jquery';
import { slick } from 'slick-carousel';

$(document).ready(function () {
  $('[data-how-slider]').on('init', function (event, slick) {
    const totalSlide = slick.slideCount;

    $('[data-current]').text('0' + (slick.currentSlide + 1));
    $('[data-total]').text('/ ' + '0' + totalSlide);
  });

  $('[data-how-slider]').slick({
    lazyLoad: 'ondemand',
    arrows: true,
    // autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    // autoplaySpeed: 5000,
    speed: 1000,
    pauseOnHover: true,
    infinite: true,
    touchMove: true,
    swipe: true,
    prevArrow: $('[data-button-prev]'),
    nextArrow: $('[data-button-next]'),
  });
  $('[data-how-slider]').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('[data-current]').text('0' + (nextSlide + 1));
  });
  $('[data-how-slider] .how-list__image').on('click', function (e) {
    let imageWidth = $(this).width();

    var offset = $(this).offset();
    var relativeX = e.pageX - offset.left;

    if (relativeX <= imageWidth / 2) {
      $('[data-how-slider]').slick('slickPrev');
    } else {
      $('[data-how-slider]').slick('slickNext');
    }
  });
});
