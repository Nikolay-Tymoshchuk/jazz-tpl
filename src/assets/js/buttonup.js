import $ from 'jquery';

$(function () {
  $('.footer-cont__scrollup').click(function () {
    $('html, body').animate(
      {
        scrollTop: 0,
      },
      10,
    );
  });
});
