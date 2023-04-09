'use strict';

const forgottenPasswordForm = document.querySelector('.forgotten__password__form');

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
  });

  return !allInputs.every((input) => input.value !== '');
}

function displaySuccessMessage(form, message) {
  const validFeedbackContainer = form.querySelector('.valid__feedback');
  validFeedbackContainer.classList.remove('hidden');
  validFeedbackContainer.innerHTML = message;
}

forgottenPasswordForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (hasEmptyFiled(this)) return;

  // Sending an email for the user

  // display success message
  displaySuccessMessage(this, 'Si cette adresse e-mail correspond à un compte existant, un mail y a été envoyé');
});
