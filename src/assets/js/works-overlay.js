const refs = {
  img: document.querySelectorAll('.gallery-overyal__picture'),
  filterBtns: document.querySelectorAll('.works-buttons__btn'),
  exteriorItems: document.querySelectorAll('.first-items'),
};

refs.img.forEach(item => {
  let nextElem = item.parentNode.querySelector('.grid-item__text');

  item.addEventListener('mousemove', e => {
    const top = Number(e.layerY) - 35;

    nextElem.setAttribute('style', `opacity:1; top:${top}px; left:20px;`);
  });
  item.addEventListener('mouseleave', e => {
    nextElem.style.cssText = `opacity:0;  left:-100px; `;
  });
});

refs.filterBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    if (e.target.classList.contains('works-buttons__exterior')) {
      refs.exteriorItems.forEach(item => {
        item.classList.add('first-padding');
      });
    } else {
      refs.exteriorItems.forEach(item => {
        item.classList.remove('first-padding');
      });
    }
  });
});
