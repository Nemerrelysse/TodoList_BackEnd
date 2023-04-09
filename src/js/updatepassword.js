'use strict';

const updatePasswordForm = document.querySelector('.update__password__form');

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

function displaySuccessMessage(form, message) {
  const validFeedbackContainer = form.querySelector('.valid__feedback');
  validFeedbackContainer.classList.remove('hidden');
  validFeedbackContainer.innerHTML = message;
}

updatePasswordForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (hasEmptyFiled(this)) return;

  if (!checkMatchingPasswords(this)) return;

  // Send the new password to the server

  // Display success message
  displaySuccessMessage(this, 'Le mot de passe a été modifié avec succès. Cliquez ici pour vous connecter');

  // Redirect to the login page
});
