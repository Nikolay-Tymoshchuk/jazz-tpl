window.addEventListener('load', function () {
  const footerNavLinks = document.querySelectorAll('.footer__nav-link');
  const footerServicesLinks = document.querySelectorAll('.footer__services-list-link');
  setActiveLink(footerNavLinks);
  setActiveLink(footerServicesLinks);
});

function setActiveLink(arr) {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];

    if (element.href === window.location.href) {
      element.classList.add('active-nav-link');
    }
  }
}