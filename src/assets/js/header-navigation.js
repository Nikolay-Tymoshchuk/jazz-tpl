import $ from 'jquery';

const refs = {
  header: document.querySelector('.header'),
  heroSection: document.querySelector('.hero'),
};

$(window).on('scroll', function () {
  $(refs.header).toggleClass('fixed', $(this).scrollTop() > $('.hero').height());

  $(refs.headerTitle).toggleClass('hidden', $(this).scrollTop() > 100);
});

const sections = document.querySelectorAll('.section');
const menuLinks = document.querySelectorAll('.nav-link');

function checkActiveSection() {
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight + 100;
    const sectionBottom = sectionTop + sectionHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      menuLinks.forEach(link => {
        if (link.getAttribute('href').substring(1) === section.getAttribute('id')) {
          link.classList.add('active-link');
        } else {
          link.classList.remove('active-link');
        }
      });
    }
  });
}

window.addEventListener('scroll', checkActiveSection);
