import { Tamagotchi } from './tamagotchi.js';

const form = document.querySelector('#tamagotchi-form');
const nameInput = document.querySelector('#name-input');
const typeInput = document.querySelector('#type-input');
const petsContainer = document.querySelector('#pets-container');
const formMessage = document.querySelector('#form-message');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const type = typeInput.value;

  if (!name) {
    formMessage.textContent = 'Please add a name before creating your Tamagotchi.';
    nameInput.focus();
    return;
  }

  new Tamagotchi(name, type, petsContainer);
  formMessage.textContent = `${name} the ${type} is ready!`;

  nameInput.value = '';
  nameInput.focus();
});
