function showMessage() {
  // Thank u message
}

//ref
const allButtons = document.querySelectorAll('[data-button]');
const hiddenInput = document.querySelector('[hidden]');

if (window.location.pathname === '/career.html') {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].onclick = function () {
      const title = allButtons[i].parentNode.querySelector('[data-title]');

      hiddenInput.value = title.textContent;
    };
  }
}

$('.contact-form').submit(function () {
  var form = $(this);
  var error = false;

  form.find('textaria, [required]').each(function () {
    if ($(this).val() == '') {
      error = true;
      console.log('empty field: validation error');
    }
  });

  if (!error) {
    var data = form.serialize();

    $.ajax({
      type: 'POST',
      url: '../mail.php',
      dataType: 'json',
      data: data,
      beforeSend: function beforeSend(data) {
        form.find('button[type="submit"]').attr('disabled', 'disabled');
      },
      success: function (data) {
        if (data['error']) {
          alert(data['error']);
          form.trigger('reset');
          console.log('error data');
        } else {
          form[0].reset();
          // showMessage();
          console.log('success');
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      },
      complete: function (data) {
        form.find('button[type="submit"]').prop('disabled', false);
        console.log('complete');
        window.location.pathname = '/success.html';
      },
    });
  }
  return false;
});

$('#subscribeForm').submit(function () {
  var form = $(this);
  var error = false;

  form.find('textaria, input').each(function () {
    if ($(this).val() == '') {
      error = true;
      console.log('empty field: validation error');
    }
  });

  if (!error) {
    var data = form.serialize();
    $.ajax({
      type: 'POST',
      url: '../subscribe-mail.php',
      dataType: 'json',
      data: data,
      beforeSend: function beforeSend(data) {
        form.find('button[type="submit"]').attr('disabled', 'disabled');
      },
      success: function (data) {
        if (data['error']) {
          alert(data['error']);
          form.trigger('reset');
          console.log('error data');
        } else {
          form[0].reset();
          // showMessage();
          console.log('success');
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      },
      complete: function (data) {
        form.find('button[type="submit"]').prop('disabled', false);
        console.log('complete');
        window.location.pathname = '/success.html';
      },
    });
  }
  return false;
});
