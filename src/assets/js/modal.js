window.addEventListener('DOMContentLoaded', function () {
  const openModalBtn = document.querySelectorAll('.btn-modal');
  const modal = document.querySelector('[data-modal]');
  const modalTeam = document.querySelector('[data-team-modal]');
  const closeModalBtn = document.querySelector('[data-modal-close]');
  const closTeamModalBtn = document.querySelector('[data-team-modal-close]');
  const body = document.querySelector('body');
  const backdrop = document.querySelectorAll('.backdrop');

  openModalBtn.forEach(function (btn) {
    btn.addEventListener('click', e => {
      e.preventDefault();
      setTimeout(() => {
        if (btn.hasAttribute('data-team-btn')) {
          getModalTeam(btn);
          toggleModal(modalTeam);
        }
        else {
          toggleModal(modal);
        }
      }, 500);
    });
  });

  function getModalTeam(btn) {
    let partnerName = btn.parentNode.dataset.teamName;
    let teamTitle = modalTeam.querySelector('.modal-title');
    teamTitle.textContent = `Hi, my name is `;
    const span = `<span id="partnerName">${partnerName}</span>`;
    teamTitle.insertAdjacentHTML('beforeend', span);
  }

  function toggleModal(elem) {
    elem.classList.toggle('is-hidden');
    body.classList.toggle('scroll-hidden');
  }


  function handleKey(e) {
    if (!modal.classList.contains('is-hidden')) {
      if (e.key === 'Escape') {
        toggleModal(modal);
      }
    }
    if (!modalTeam.classList.contains('is-hidden')) {
      if (e.key === 'Escape') {
        toggleModal(modalTeam);
      }
    }
  }

  function handleClose(e) {
    if (e.target === e.currentTarget) {
      if (!modal.classList.contains('is-hidden')) {
        toggleModal(modal);
      }
      if (!modalTeam.classList.contains('is-hidden')) {
        toggleModal(modalTeam);
      }
    }
  }

  document.addEventListener('keydown', handleKey);
  backdrop.forEach(el => {
    el.addEventListener('mousedown', handleClose);
  });
  closeModalBtn.addEventListener('click', function () { toggleModal(modal) });
  closTeamModalBtn.addEventListener('click', function () { toggleModal(modalTeam) });
});
