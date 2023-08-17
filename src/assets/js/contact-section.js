import datepicker from 'js-datepicker';
import moment from 'moment';

import { showInputError, removeInputError } from './contact-form_messages';
import validate from './contact-form_validate';
import { validationForm } from './contact-form';
import { removeDragActive } from './drag-files';
import { mailHandler } from './mail';

const refs = {
  contactForm: document.getElementById('contact-sec-form'),
  userName: document.getElementById('get-name'),
  userEmail: document.getElementById('get-email'),
  userDeadline: document.getElementById('get-date'),
  userTypeProject: document.getElementsByName('typeProject'),
  numbersQuantity: document.getElementById('number-quantity'),
  rangesQuantity: document.getElementById('range-quantity'),
  totalPrice: document.getElementById('total-price'),
  totalImages: document.getElementById('total-images'),
  dropArea: document.getElementById('drop-area'),
};

const aerialPrice = 1400;
const exteriorPrice = 1000;
const interiorPrice = 800;

let totalImgQuantity;
let totalUserPrice;
let aerialQuantity;
let exteriorQuantity;
let interiorQuantity;
let line;

const picker = datepicker(refs.userDeadline, {
  formatter: (input, date, instance) => {
    let formatDate = moment(date).format('DD MMM YYYY');
    input.value = formatDate;
  },

  minDate: new Date(),
});

const windowSizeCheck = function () {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1536) {
    refs.rangesQuantity.classList.remove('visually-hidden');
    refs.numbersQuantity.classList.add('visually-hidden');

    rangesInputs();
  } else {
    refs.rangesQuantity.classList.add('visually-hidden');
    refs.numbersQuantity.classList.remove('visually-hidden');
    numbersInputs();
  }
};

windowSizeCheck();
window.addEventListener('resize', windowSizeCheck);

function numbersInputs() {
  const inputQuantity = refs.numbersQuantity.querySelectorAll('[data-quantity]');

  getTotal(refs.numbersQuantity);
  inputQuantity.forEach(number => {
    const btnPlus = number.parentNode.querySelector('[data-plus]');
    const btnMinus = number.parentNode.querySelector('[data-minus]');

    let counter = Number(number.value);
    if (counter === 0) btnMinus.setAttribute('disabled', 'disabled');
    if (counter === 10) btnPlus.setAttribute('disabled', 'disabled');
    if (counter !== 0) number.classList.add('active');

    btnPlus.addEventListener('click', function () {
      counter += 1;
      number.value = counter;
      if (btnMinus.hasAttribute('disabled')) {
        btnMinus.removeAttribute('disabled');
      }
      if (!number.hasAttribute('active')) {
        number.classList.add('active');
      }
      if (counter === 10) {
        btnPlus.setAttribute('disabled', 'disabled');
      }
      getTotal(refs.numbersQuantity);
    });
    btnMinus.addEventListener('click', function () {
      counter -= 1;
      number.value = counter;
      if (btnPlus.hasAttribute('disabled')) {
        btnPlus.removeAttribute('disabled');
      }

      if (!number.hasAttribute('active')) {
        number.classList.add('active');
      }
      if (counter === 0) {
        btnMinus.setAttribute('disabled', 'disabled');
        number.classList.remove('active');
      }
      getTotal(refs.numbersQuantity);
    });
  });
}

function rangesInputs() {
  const ranges = refs.rangesQuantity.querySelectorAll('[data-range]');

  ranges.forEach(range => {
    changeRangeColor(range);
    getRangeValue(range);
    getTotal(refs.rangesQuantity);
    changeOutputPosition(range);

    range.oninput = function () {
      changeRangeColor(range);
      getRangeValue(range);
      getTotal(refs.rangesQuantity);
    };
  });
}

function getTotal(elem) {
  aerialQuantity = Number(elem.querySelector('[data-quantity="aerial"]').value);
  exteriorQuantity = Number(elem.querySelector('[data-quantity="exterior"]').value);
  interiorQuantity = Number(elem.querySelector('[data-quantity="interior"]').value);
  totalImgQuantity = aerialQuantity + exteriorQuantity + interiorQuantity;
  totalUserPrice =
    aerialQuantity * aerialPrice +
    exteriorQuantity * exteriorPrice +
    interiorQuantity * interiorPrice;
  totalTextQuantity();
}

function totalTextQuantity() {
  if (totalImgQuantity === 0) {
    refs.totalImages.parentNode.style.color = 'var(--slider-decor-cl)';
    refs.totalImages.textContent = totalImgQuantity;
  } else {
    refs.totalImages.parentNode.style.color = '';
    refs.totalImages.textContent = totalImgQuantity;
  }
  refs.totalPrice.textContent = totalUserPrice + '.00 $';
}

function changeRangeColor(elem) {
  line = (elem.value / elem.max) * 100;
  elem.style.background =
    'linear-gradient(to right, var(--dark-text-cl), var(--dark-text-cl) ' +
    line +
    '%, var(--border-cl) ' +
    line +
    '%, var(--border-cl) 100%)';
}

function getRangeValue(elem) {
  let inputRangeSpan = elem.parentNode.querySelector('[data-quantity]');
  inputRangeSpan.textContent = elem.value;

  if (Number(elem.value) === 0) {
    elem.style.opacity = '0.5';
  } else {
    elem.style.opacity = '';
  }
}

function changeOutputPosition(range) {
  const outputValue = range.parentNode.querySelector('[data-quantity]'),
    rangeEnd = range.parentNode.querySelector('.range__end'),
    setValue = () => {
      const newValue = Number(((range.value - range.min) * 100) / (range.max - range.min));
      outputValue.textContent = range.value;

      if (outputValue.value >= 1) {
        outputValue.setAttribute(
          'style',
          `opacity:1; left:${newValue}%; transform:translateX(-${newValue}%)`,
        );
      }
      if (Number(outputValue.value) === 10) {
        outputValue.style.opacity = '0';
        rangeEnd.setAttribute('style', 'color:var(--dark-text-cl); font-weight: 700;');
      } else {
        rangeEnd.setAttribute('style', 'color:var(--main-text-cl); font-weight: 400;');
      }

      if (Number(outputValue.value) === 0) {
        outputValue.style.opacity = '0';
      }
    };
  document.addEventListener('DOMContentLoaded', setValue);
  range.addEventListener('input', setValue);
}

// ==========================валідація полей форми==============================
const inputs = [refs.userName, refs.userEmail];

inputs.forEach(el => {
  el.addEventListener('blur', () => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      removeInputError(el);
      showInputError(el);
    }
  });
  el.addEventListener('focus', () => removeInputError(el));
});

// ========================== робота з формою ==========================================================
function handleSubmit(e) {
  e.preventDefault();

  const isValidForm = validationForm(inputs);
  if (!isValidForm) return;

  // отправка письма mail.php через mail.js
  mailHandler(e).finally(() => {
    if (!refs.numbersQuantity.classList.contains('visually-hidden')) {
      getTotal(refs.numbersQuantity);
    }
    if (!refs.rangesQuantity.classList.contains('visually-hidden')) {
      const ranges = refs.rangesQuantity.querySelectorAll('[data-range]');
      ranges.forEach(range => {
        changeRangeColor(range);
        getRangeValue(range);
        getTotal(refs.rangesQuantity);
      });
    }
    if (refs.dropArea.classList.contains('drag-files__active')) {
      removeDragActive();
      let itemsArr = refs.dropArea.querySelectorAll('.drag-files__gallery-item');
      itemsArr.forEach(item => item.remove());
    }
  });
}
refs.contactForm.addEventListener('submit', handleSubmit);
