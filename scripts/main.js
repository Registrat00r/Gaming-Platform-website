const OpenFormBtn = document.getElementById('login-btn');
const modalSign = document.getElementById('modal-sign');
const modalReg = document.getElementById('modal-reg');
const CloseFormBtn = document.querySelectorAll('.form__close-btn');

OpenFormBtn.addEventListener('click', function() {
  modalSign.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});

CloseFormBtn.forEach(btn => {
    btn.addEventListener('click', function() {
        const form = this.closest('form');
        form.style.display = 'none';
        document.body.style.overflow = '';
        form.reset();
    });
});

window.addEventListener('click', function(event) {
  if (event.target === modalSign || event.target === modalReg) {
    event.target.style.display = 'none';
    document.body.style.overflow = '';
    event.target.reset();
  }
});

document.querySelectorAll('.trending__card-information').forEach(card => {
    card.addEventListener('click', () => {
        const isLiked = card.classList.toggle('active');
        let count = parseInt(card.querySelector('p').textContent);
        card.querySelector('p').textContent = (isLiked ? count + 1 : count - 1) + ' Followers';
    });
});

document.getElementById('to-reg').addEventListener('click', () => {
    document.getElementById('modal-sign').style.display = 'none';
    document.getElementById('modal-reg').style.display = 'flex';
});

document.getElementById('to-login').addEventListener('click', () => {
    document.getElementById('modal-reg').style.display = 'none';
    document.getElementById('modal-sign').style.display = 'flex';
});