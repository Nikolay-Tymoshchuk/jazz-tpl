import $ from 'jquery';
import { async } from 'regenerator-runtime';


const $window = $(window);

$window.scroll(function () {
  let $video = $('[data-video-serv]');

  $video.each(function () {
    let $topOfVideo = $(this).offset().top;
    let $bottomOfVideo = $(this).offset().top + $video.outerHeight();

    let $topOfScreen = $window.scrollTop();
    let $bottomOfScreen = $window.scrollTop() + $window.innerHeight();

    if ($bottomOfScreen > $bottomOfVideo && $topOfScreen < $topOfVideo) {
      if (!$(this).prop('muted')) {
        $(this).prop('muted', true);
      }

      $(this)[0].play();
    }
  });
});
