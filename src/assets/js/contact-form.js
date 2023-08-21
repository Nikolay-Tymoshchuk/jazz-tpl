import { showInputError, removeInputError } from './contact-form_messages';
import validate from './contact-form_validate';
import { mailHandler } from './contact';

const refs = {
  forms: document.querySelectorAll('[data-form]'),
  contactInputs: document.querySelectorAll('[data-contact]'),
  teamInputs: document.querySelectorAll('[data-team]'),
};

const checkValidation = el => {
  el.addEventListener(
    'blur',
    () => {
      el.value.length ? el.classList.add('wrote') : el.classList.remove('wrote');

      const isValidInput = validate(el);
      if (!isValidInput) {
        removeInputError(el);
        showInputError(el);
      }
    },
    { passive: true },
  );
  el.addEventListener('focus', () => removeInputError(el), { passive: true });
};

refs.contactInputs.forEach(el => {
  checkValidation(el);
});

refs.teamInputs.forEach(el => {
  checkValidation(el);
});

export const validationForm = inputs => {
  let isValids = true;
  inputs.forEach(el => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      removeInputError(el);
      showInputError(el);
      isValids = false;
    }
    return isValidInput;
  });
  return isValids;
};

const onHandleSubmit = e => {
  e.preventDefault();

  if (e.target.id === 'team-form') {
    const isValidForm = validationForm(refs.teamInputs);
    if (!isValidForm) return;
    mailHandler(e, true);
  }

  if (e.target.id === 'contact-form') {
    const isValidForm = validationForm(refs.contactInputs);
    if (!isValidForm) return;
    mailHandler(e);
  }
};

refs.forms.forEach(form => {
  form.addEventListener('submit', onHandleSubmit);
});
