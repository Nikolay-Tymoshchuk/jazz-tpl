const videos = document.querySelectorAll('[data-video-serv]');

videos.forEach((video, index) => {
  const supportsWebm = video.canPlayType('video/webm') === 'probably' ||
    video.canPlayType('video/webm') === 'maybe';
  const screenWidth = window.innerWidth;
  const videoSource = video.querySelector('source');

  if (screenWidth < 768) {
    if(supportsWebm){
      videoSource.src = `./assets/images/services/service${index + 1}_640.webm`;
      videoSource.type = 'video/webm';
    }else {
    videoSource.src = `./assets/images/services/service${index + 1}_640.mp4`;

    }
  } else if (screenWidth >= 768 && screenWidth < 1024) {
    if(supportsWebm){
      videoSource.src = `./assets/images/services/service${index + 1}_1280.webm`;
      videoSource.type = 'video/webm';
    }else {
    videoSource.src = `./assets/images/services/service${index + 1}_1280.mp4`;

    }
  } else {
    if(supportsWebm){
      videoSource.src = `./assets/images/services/service${index + 1}_1920.webm`;
      videoSource.type = 'video/webm';
    }else {
    videoSource.src = `./assets/images/services/service${index + 1}_1920.mp4`;

    }
  }
});