window.addEventListener('DOMContentLoaded', function () {
  const panContainer = document.querySelector('.panorama__image-container');
  const img = 'assets/images/gallery/panorama/panorama-interior.jpg';
  let panoramaAdded = false; // Флаг для отслеживания добавления панорамы

  const panorama = new PANOLENS.ImagePanorama(img);
  panorama.addEventListener('enter-fade-start', function () {
    viewer.tweenControlCenter(new THREE.Vector3(90, 0, 0), 0);
    viewer.camera.fov = 60;
    viewer.camera.updateProjectionMatrix();
  });

  const viewer = new PANOLENS.Viewer({
    container: panContainer,
    autoRotate: true,
    autoRotateSpeed: 0.2,
    controlBar: true,
    viewIndicator: true,
  });

  const checkVisibility = () => {
    const rect = panContainer.getBoundingClientRect();

    if (rect.top <= window.innerHeight && rect.bottom >= 0 && !panoramaAdded) {
      console.log('Visible. Adding panorama.');
      viewer.add(panorama); // Добавляем панораму
      panoramaAdded = true; // Устанавливаем флаг, чтобы не добавлять панораму повторно
    }
  };

  // Добавляем обработчик события прокрутки и сразу вызываем его
  window.addEventListener('scroll', checkVisibility);
  checkVisibility();
});
