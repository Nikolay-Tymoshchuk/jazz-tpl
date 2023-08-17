window.addEventListener('DOMContentLoaded', function () {
  const panContainer = document.querySelector('.panorama__image-container');
  const img = 'assets/images/gallery/panorama/panorama-interior.jpg';

  const panorama = new PANOLENS.ImagePanorama(img);
  panorama.addEventListener('enter-fade-start', function () {
    viewer.tweenControlCenter(new THREE.Vector3(90, 0, 0), 0);
    viewer.camera.fov = 50;
    viewer.camera.updateProjectionMatrix();
  });

  const viewer = new PANOLENS.Viewer({
    container: panContainer,
    autoRotate: true,
    autoRotateSpeed: 0.15,
    controlBar: true,
    viewIndicator: true,
  });
  viewer.add(panorama);
});
