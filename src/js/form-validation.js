const allForms = document.querySelectorAll('[data-form]');

for (let i = 0; i < allForms.length; i++) {
  allForms[i].onclick = function () {
    const checkForm = allForms[i];
    const checkInput = checkForm.querySelector('[data-required]');
    const errorField = checkForm.querySelector('.error');

    checkForm.addEventListener(
      'submit',
      e => {
        if (!checkInput.validity.valid) {
          errorField.innerHTML = 'This is a required field';
          errorField.className = 'error active';
          e.preventDefault();
        }
      },
      false,
    );
    checkInput.addEventListener(
      'input',
      () => {
        if (checkInput.validity.valid) {
          errorField.innerHTML = '';
          errorField.className = 'error';
        }
      },
      false,
    );
  };
}
