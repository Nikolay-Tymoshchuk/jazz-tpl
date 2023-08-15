import { lightgallery } from 'lightgallery.js';

(() => {
  const openMenuBtn = document.querySelector('[data-menu-btn]');
  const mobileMenu = document.querySelector('[data-menu]');
  const body = document.querySelector('body');
  const menuLink = document.querySelectorAll('.mobile-menu__link');
  const buttonImg = document.querySelector('.btn-burger__img');
  const headerTitle = document.querySelector('.header-logocont__title');
  const mobileMenuBtn = document.querySelector('.mobile-menu__btn');

  openMenuBtn.addEventListener('click', () => {
    toggleMenu();
  });

  menuLink.forEach(function (link) {
    link.addEventListener('click', () => {
      toggleMenu();
    });
  });

  function toggleMenu() {
    const expanded = openMenuBtn.getAttribute('aria-expanded') === 'true' || false;

    openMenuBtn.classList.toggle('is-active');
    openMenuBtn.setAttribute('aria-expanded', !expanded);

    mobileMenu.classList.toggle('is-open');
    body.classList.toggle('scroll-hidden');

    if (window.isLightGalleryOpen) {
      const el = document.getElementById('gallery');
      lightGallery(el);
      const plugin = window.lgData[el.getAttribute('lg-uid')];
      plugin.destroy();
    }

    if (mobileMenu.classList.contains('is-open')) {
      buttonImg.setAttribute('src', './assets/images/header/close.svg');
      headerTitle.classList.add('hidden');
    } else {
      buttonImg.setAttribute('src', './assets/images/header/burger.svg');
      headerTitle.classList.remove('hidden');
    }
  }

  mobileMenuBtn.addEventListener('click', e => {
    toggleMenu();
  });
})();
