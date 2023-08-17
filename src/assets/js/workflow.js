import $ from 'jquery';
import { async } from 'regenerator-runtime';

const $video = $('[data-video]');
const $videoWrapper = $('[data-video-wrapper]');
const $window = $(window);

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    $video[0].currentTime = 0;
    $video.prop('muted', false);
    $video[0].requestFullscreen();
    $video[0].play();
  } else {
    if (!$video.prop('muted')) {
      $video.prop('muted', true);
    }

    document.exitFullscreen();
  }
};

$window.scroll(function () {
  let $topOfVideo = $video.offset().top;
  let $bottomOfVideo = $video.offset().top + $video.outerHeight();

  let $topOfScreen = $window.scrollTop();
  let $bottomOfScreen = $window.scrollTop() + $window.innerHeight();

  if ($bottomOfScreen > $bottomOfVideo && $topOfScreen < $topOfVideo) {
    if (!$video.prop('muted')) {
      $video.prop('muted', true);
    }
    $video.prop('controls', true);

    $video[0].play();
  } else if (!document.fullscreenElement) {
    $video[0].pause();
  }
});

$videoWrapper.on('click touchend', function () {
  toggleFullScreen();
});
