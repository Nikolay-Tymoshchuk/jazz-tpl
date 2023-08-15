import $ from 'jquery';
import { smoothScroll } from './scroll.js';
import { lightgallery } from 'lightgallery.js';

const refs = {
  pageNav: document.querySelector('.header-cont'),
  links: document.querySelectorAll('.nav-link'),
};

refs.links.forEach(link => link.addEventListener('click', linkHandler));

function linkHandler(e) {
  e.preventDefault();
  const target = this;
  const element = target.getAttribute('href');
  if (window.isLightGalleryOpen) {
    const el = document.getElementById('gallery');
    lightGallery(el);
    const plugin = window.lgData[el.getAttribute('lg-uid')];
    plugin.destroy();
  }

  smoothScroll(element.substr(1), refs.pageNav);
}
