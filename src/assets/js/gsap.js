import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import $ from 'jquery';

function animateFrom(elem, direction = 1) {
  const isDesktop = window.matchMedia('(min-width: 1280px)').matches;
  if (!isDesktop) return;
  direction = direction || 1;

  var x = 0,
    y = direction * 100;

  if (elem.classList.contains('gs_reveal_fromLeft')) {
    x = -400;
    y = 0;
  } else if (elem.classList.contains('gs_reveal_fromRight')) {
    x = 400;
    y = 0;
  }

  elem.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  elem.style.opacity = '0';

  gsap.fromTo(
    elem,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 1.5,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: 'expo',
      overwrite: 'auto',
      rotation: 0.01,
    },
  );
}

function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.gs_reveal').forEach(function (elem) {
  // hide(elem);

  ScrollTrigger.create({
    trigger: elem,
    onEnter: function () {
      animateFrom(elem);
    },
  });
});
