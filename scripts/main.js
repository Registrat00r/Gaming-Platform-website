const OpenFormBtn = document.getElementById('login-btn');
const modalSign = document.getElementById('modal-sign');
const modalReg = document.getElementById('modal-reg');
const CloseFormBtn = document.querySelectorAll('.form__close-btn');

OpenFormBtn.addEventListener('click', function () {
    modalSign.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

CloseFormBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        const form = this.closest('form');
        form.style.display = 'none';
        document.body.style.overflow = '';
        form.reset();
    });
});

window.addEventListener('click', function (event) {
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
    document.getElementById('modal-sign').reset();
    document.getElementById('modal-reg').style.display = 'flex';
});

document.getElementById('to-login').addEventListener('click', () => {
    document.getElementById('modal-reg').style.display = 'none';
    document.getElementById('modal-reg').reset();
    document.getElementById('modal-sign').style.display = 'flex';
});

document.getElementById('modal-reg').addEventListener('submit', function (event) {
    event.preventDefault();

    const newLogin = document.getElementById('reg-login').value.trim();
    const newPass = document.getElementById('reg-password').value;
    const repeatPass = document.getElementById('pass-repeat').value;

    const users = JSON.parse(localStorage.getItem('Person') || '[]');

    let isUserCreate = users.some(user => user.login === newLogin)

    if (isUserCreate) {
        alert("Пользователь сущесвует!");
        return;
    }

    if (newPass.length < 8) {
        alert("Пароль содержит меньше 8 символов");
        return;
    }

    if (newPass !== repeatPass) {
        alert("Пароли должны совпадать!");
        return;
    }

    if (newLogin === newPass) {
        alert("Нельзя создать пользователя схожим именем и паролем!");
        return;
    }

    const object = {
        login: newLogin,
        pass: newPass
    }

    users.push(object)

    localStorage.setItem('Person', JSON.stringify(users));
    // console.log(localStorage.getItem('Person'));

    this.reset();
    document.getElementById('modal-reg').style.display = 'none';
    document.getElementById('modal-sign').style.display = 'flex';
});

document.getElementById('modal-sign').addEventListener('submit', function(event) {
    event.preventDefault();

    const login = document.getElementById('login-text').value.trim();
    const pass = document.getElementById('password-text').value;

    const users = JSON.parse(localStorage.getItem('Person') || '[]');

    const foundPerson = users.find(user => user.login === login && user.pass === pass)

    if (!foundPerson){
        alert("Неверный логин или пароль!");
        return;
    }

    localStorage.setItem('currentPerson', login);

    alert("Вы вошли как " + login);
    this.reset();
    this.style.display = 'none';
    document.body.style.overflow = '';
});

window.addEventListener('DOMContentLoaded', () => {
    const currentPerson = localStorage.getItem('currentPerson');

    if (currentPerson) {
        document.getElementById('login-text').value = currentPerson;
    }
});