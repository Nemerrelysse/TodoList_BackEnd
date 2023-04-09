'use strict';

const signUpForm = document.querySelector('.sign__up__form');

function toggleErrorMessage(allInputs, messages) {
  allInputs.forEach((input) => {
    const errContainer = input.nextElementSibling;

    // when input is empty remove hidden class
    if (!input.value) {
      input.classList.add('error');
      errContainer.classList.remove('hidden');
      errContainer.innerHTML = messages[input.id];

      // when input is not empty add hidden class
    } else {
      input.classList.remove('error');
      errContainer.classList.add('hidden');
    }
  });
}

function hasEmptyFiled(form) {
  const allInputs = [...form.querySelectorAll('input')];

  toggleErrorMessage(allInputs, {
    email: 'Veuillez renseigner une adresse e-mail',
    password: 'Veuillez renseigner un mot de passe',
    confirm__password: 'Veuillez renseigner un mot de passe',
  });

  return !allInputs.every((input) => input.value !== '');
}

function checkMatchingPasswords(form) {
  const password = form.querySelector('.password');
  const confirmPassword = form.querySelector('.confirm__password');
  const passwordErrContainer = confirmPassword.nextElementSibling;

  if (password.value === confirmPassword.value) return true;

  confirmPassword.classList.add('error');
  passwordErrContainer.classList.remove('hidden');
  passwordErrContainer.innerHTML = 'Les mots de passe ne correspondent pas';
  return false;
}

const displayEmailError = (form, errMsg) => {
  const email = form.querySelector('.email');
  const emailErrContainer = email.nextElementSibling;
  email.classList.add('error');
  emailErrContainer.classList.remove('hidden');
  emailErrContainer.innerHTML = errMsg;
};

signUpForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (hasEmptyFiled(this)) return;

  if (!checkMatchingPasswords(this)) return;

  displayEmailError(this, 'Cette adresse e-mail est déjà utilisée');
  // Send the user information to the server
  // Handle the server response
  // Redirect to the login page
});
