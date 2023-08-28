const counters = document.querySelectorAll('[data-target]');

counters.forEach(counter => {
  counter.innerHTML = '0';

  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const inc = +counter.innerText;

    if (inc < target) {
      counter.innerText = inc + 1;
      setTimeout(updateCounter, 1);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});
