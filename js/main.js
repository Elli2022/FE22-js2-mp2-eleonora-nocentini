//import av klassen Tamagotchi
import { Tamagotchi } from './tamagotchi.js';

//deklarar en variabel för form
const form = document.querySelector('#tamagotchi-form');

//event-listener på knappen "submit"
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  //deklarerar variabler för att inhämta användarens inputs
  const nameInput = document.querySelector('#name-input');
  const typeInput = document.querySelector('#type-input');
  
  //värdet av användarens inputs
  const name = nameInput.value;
  const type = typeInput.value;
  
  //skapar nytt tamagotchi-objekt
  const tamagotchi = new Tamagotchi(name, type);
  
  //tömmer input-fälten
  nameInput.value = '';
  typeInput.value = '';
});

