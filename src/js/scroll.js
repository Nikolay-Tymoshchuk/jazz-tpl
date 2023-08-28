const pageHeader = document.getElementById('header');

const targetElements = document.querySelectorAll('.contents__link');

const sticky = pageHeader.offsetHeight;

for (let element of targetElements) {
  element.addEventListener('click', event => {
    event.preventDefault();
    const blockID = element.getAttribute('href');

    const scrollTarget = document.querySelector(blockID);

    const topOffset = sticky;
    const elementPosition = scrollTarget.getBoundingClientRect().top;

    const offsetPosition = elementPosition - topOffset;
    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth',
    });
  });
}
