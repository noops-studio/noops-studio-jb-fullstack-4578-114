// const num1: number = parseInt(prompt("Enter a number: ") || "0");
// const num2: number = parseInt(prompt("Enter a number: ") || "0");
let num1: number = 0;
let num2: number = 0;
document.getElementById("formy").addEventListener("submit", function (e) {
  e.preventDefault();
  num1 = parseInt(
    (document.getElementById("number1") as HTMLInputElement).value
  );
  num2 = parseInt(
    (document.getElementById("number2") as HTMLInputElement).value
  );
  init(num1, num2);
});

const init = (num1, num2) => {
  document.getElementById("content").innerHTML = "";
  const printPrimeNumber = (number1: number, number2: number) => {
    let numbers = [];
    for (let i = number1; i <= number2; i++) {
      let flag = 0;
      for (let j = 2; j < i; j++) {
        if (i % j === 0) {
          flag = 1;
          break;
        }
      }
      if (i > 1 && flag === 0) {
        numbers.push(i);
      }
    }
    return numbers;
  };

  if (num1 > num2) {
    const primes = printPrimeNumber(num2, num1);
  } else {
    const primes = printPrimeNumber(num1, num2);
  }

  for (const num of primes) {
    document.getElementById("content").innerHTML += `<li>${num}</li>`;
  }
  // console.log(primes);
};
