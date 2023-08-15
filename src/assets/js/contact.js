import axios from 'axios';

export async function mailHandler(e, additional = false) {
  const form = e.target;
  const error = ![...form.querySelectorAll('textarea, input')].some(field => field.value);

  if (!error) {
    const data = new FormData(form);
    if (additional) {
      const partnerName = document.getElementById('partnerName');
      data.append('partner', partnerName.textContent);
    }

    const beforeSend = function () {
      // disables btn submit
      document
        .querySelector(`button[form=${form.id}][type="submit"]`)
        .setAttribute('disabled', true);

      const div = `<div class="form-msg-wrapper"><span class="form-msg">Submitting the form...</span></div>`;
      form.insertAdjacentHTML('beforeend', div);
    };
    const complete = function () {
      document.querySelector(`button[form=${form.id}][type="submit"]`).removeAttribute('disabled');

      const formMsgDiv = form.querySelector('.form-msg-wrapper');

      setTimeout(() => {
        formMsgDiv.remove();
      }, 10000);
    };
    const showError = function () {
      const formMsgDiv = form.querySelector('.form-msg-wrapper');
      formMsgDiv.classList.add('form-msg-error');
      formMsgDiv.innerHTML = `<div class="form-msg-wrapper"><span class="form-msg">The form was not sent. Please contact us </span><a class="form-msg-link" href="mailto:info@jazzrender.com">info@jazzrender.com</a></div>`;
    };

    beforeSend();

    const result = await axios
      .post('./contact.php', data)
      .then(data => {
        if (data.status >= 200 && data.status < 400) {
          form.reset();
          console.log('The email was sent successfully');

          const formMsg = form.querySelector('.form-msg');
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
