import axios from 'axios';
import { getFilesNamesArr, clearFilesNamesArr } from './drag-files';

export async function mailHandler(e) {
  const form = e.target;
  const error = ![...form.querySelectorAll('textarea, input')].some(field => field.value);

  if (!error) {
    const data = new FormData(form);
    const totalPrice = document.getElementById('total-price');
    const images = getFilesNamesArr().reduce((acc, item) => {
      acc.push(...Object.values(item));
      return acc;
    }, []);
    data.append('price', totalPrice.textContent);
    data.append('images', JSON.stringify(images));

    if (window.innerWidth >= 1536) {
      data.set('aerial', data.get('rangeAerial'));
      data.set('exterior', data.get('rangeExterior'));
      data.set('interior', data.get('rangeInterior'));
    }

    const beforeSend = function () {
      document
        .querySelector(`button[form=${form.id}][type="submit"]`)
        .setAttribute('disabled', true);

      const container = document.querySelector('.section.contact-sec .container');
      const div = `<div class="form-msg-wrapper"><span class="form-msg">Submitting the form...</span></div>`;
      container.insertAdjacentHTML('beforeend', div);
    };
    const complete = function () {
      clearFilesNamesArr();
      document.querySelector(`button[form=${form.id}][type="submit"]`).removeAttribute('disabled');

      const formMsgDiv = document.querySelector('.form-msg-wrapper');

      setTimeout(() => {
        formMsgDiv.remove();
      }, 10000);
    };
    const showError = function () {
      const formMsgDiv = document.querySelector('.form-msg-wrapper');
      const formMsg = document.querySelector('.form-msg');

      formMsg.textContent = 'The form was not sent. Please contact us ';
      const email = `<a class="form-msg-link" href="mailto:info@jazzrender.com">info@jazzrender.com</a>`;
      formMsgDiv.classList.add('form-msg-error');
      formMsgDiv.insertAdjacentHTML('beforeend', email);
    };

    beforeSend();

    const result = await axios
      .post('./mail.php', data)
      .then(data => {
        console.log(data);
        if (data.status >= 200 && data.status < 400) {
          form.reset();
          console.log('The email was sent successfully');

          const formMsg = document.querySelector('.form-msg');
          formMsg.textContent = 'The email was sent successfully';
          complete();
        } else {
          console.log(data.status);
          showError();
        }
      })
      .catch(error => {
        console.log(error);
        showError();
      });

    return result;
  }
}
