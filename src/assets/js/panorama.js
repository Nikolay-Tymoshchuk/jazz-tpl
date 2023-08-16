window.addEventListener('DOMContentLoaded', function () {
  const panContainer = document.querySelector('.panorama__image-container');
  const img = '/assets/images/gallery/panorama/panorama-360.webp';

  const panorama = new PANOLENS.ImagePanorama(img);
  const viewer = new PANOLENS.Viewer({
    container: panContainer,
    autoRotate: true,
    autoRotateSpeed: 0.3,
    controlBar: true,
    cameraFov: 100,
    viewIndicator: true,
  });
  viewer.add(panorama);
});
