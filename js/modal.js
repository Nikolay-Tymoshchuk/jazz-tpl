const refs = {
  modalBtn: document.querySelectorAll('[data-modal]'),
  modalClose: document.querySelectorAll('.close'),
  modal: document.querySelectorAll('.modal'),
  hiddenInput: document.querySelector('[hidden]'),
  video: document.getElementById('js-player'),
  playBtn: document.getElementById('play-btn'),
  stopBtn: document.getElementById('stop-btn')
}; // When open the modal

refs.modalBtn.forEach(item => {
  item.addEventListener('click', e => {
    let event = e.currentTarget;
    let modalId = event.getAttribute('data-modal');
    let modal = document.getElementById(modalId);
    let modalContent = modal.querySelector('.modal-js');
    modalContent.addEventListener('click', e => e.stopPropagation());
    setTimeout(() => {
      modal.classList.add('show');
      fixedModalOverflow();
      modalContent.style.animation = 'fadeInDown';
      modalContent.style.animationDuration = '0.6s';
    }, 10);
  });
}); // When close the modal

refs.modalClose.forEach(item => {
  item.addEventListener('click', e => {
    let currentModal = e.currentTarget.closest('.modal');
    closeModal(currentModal);
  });
}); // When clicks anywhere outside of the modal, close it

refs.modal.forEach(item => {
  item.addEventListener('click', e => {
    let currentModal = e.currentTarget;
    const targetModal = e.target;
    closeModal(currentModal);
    closeAndStopVideo(targetModal);
  });
});

function closeModal(currentModal) {
  let modalContent = currentModal.querySelector('.modal-js');
  modalContent.removeAttribute('style');
  refs.hiddenInput.value = '';
  modalContent.style.animation = 'fadeOutDown';
  modalContent.style.animationDuration = '0.6s';
  setTimeout(() => {
    currentModal.classList.remove('show');
    closeModalOverflow();
  }, 450);
} // Fixed window when modal opened


function fixedModalOverflow() {
  document.querySelector('body').style.overflow = 'hidden';
}

function closeModalOverflow() {
  document.querySelector('body').style.overflow = 'unset';
} // Video player custom control panel


function play() {
  refs.video.play();
  refs.playBtn.setAttribute('class', 'video__btn-hidden');
  refs.video.setAttribute('controls', 'controls');
}

function stop() {
  refs.video.pause();
  refs.video.currentTime = 0;
}

function closeAndStopVideo(targetModal) {
  const takeClassName = targetModal.childNodes[1];
  const videoModal = document.querySelector('.modal__video-wrapper');

  if (takeClassName === videoModal) {
    refs.stopBtn.addEventListener('click', stop);
    stop();
  }
}

if (refs.playBtn !== null) {
  refs.playBtn.addEventListener('click', play);
}