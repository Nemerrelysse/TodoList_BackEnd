'use strict';

const loginForm = document.querySelector('.login__form');

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
  });

  return !allInputs.every((input) => input.value !== '');
}

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (hasEmptyFiled(this)) return;

  // Send the user information to the server
  // Handle the server response
  // Redirect to the home page
});
