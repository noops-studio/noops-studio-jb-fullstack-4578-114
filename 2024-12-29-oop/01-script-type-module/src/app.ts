import { showSale } from "./shop";

function sayHi() {
  console.log('Hi!');
  showSale();
}
const sayHiButton = document.getElementById('sayHiButton');
if (sayHiButton) {
  sayHiButton.addEventListener('click', sayHi);
}