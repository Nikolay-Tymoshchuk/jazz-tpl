import $ from 'jquery';
import { lightgallery } from 'lightgallery.js';
import { thumbnail } from 'lg-thumbnail.js';
import { fullscreen } from 'lg-fullscreen.js';

const lg = document.getElementById('gallery');

lg.addEventListener(
  'onBeforeOpen',
  function (e) {
    window.isLightGalleryOpen = true;
  },
  false,
);
lg.addEventListener(
  'onCloseAfter',
  function (e) {
    window.isLightGalleryOpen = false;
  },
  false,
);

lightGallery(lg, {
  thumbnail: true,
  showThumbByDefault: false,
  download: false,
  selector: '.grid-item',
});
