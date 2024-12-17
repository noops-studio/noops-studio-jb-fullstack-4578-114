"use strict";

(() => {
  document.getElementById("b1").addEventListener("click", () => {
    const num = printEvenNumbersNt1(+prompt("ender a number"));
    console.log(num);
  });

  document.getElementById("b2").addEventListener("click", () => {
    printEvenNumbersNt1(+prompt("ender a number"));
    console.log(numbers);
  });

  // document.getElementById("b3").addEventListener("click", () => {
  //   printEvenNumbersNt1(+prompt("ender a number"));
  //   console.log(numbers);
  // });

  document.getElementById("b5").addEventListener("click", () => {
    const sum = getSumNTto1(+prompt("ender a number"));
    console.log(sum);
  });
  document.getElementById("b6").addEventListener("click", () => {
    const sum = getAssembly1toN(+prompt("ender a number"));
    console.log(sum);
  });
  document.getElementById("b7").addEventListener("click", () => {
    const fibonacciSequence = getFibonacciSequence(+prompt("ender a number"));
    console.log(fibonacciSequence);
  });

  const numbers = [];

  const getSumNTto1 = (n) => {
    if (n <= 0) return 0;
    return n + getSumNTto1(n - 1);
  };

  //pring numbers from n to 1
  const printNumbersNt1 = (n) => {
    if (n <= 0) return;
    numbers.push(n);
    printNumbersNt1(n - 1);
  };

  const printEvenNumbersNt1 = (n) => {
    if (n <= 0) return;
    if (n % 2 === 0) numbers.push(n);
    printEvenNumbersNt1(n - 1);
  };

  const printEvenNumbers1tN = (n) => {
    if (n <= 0) return;
    printEvenNumbers1tN(n - 1);
    if (n % 2 === 0) numbers.push(n);
  };

  const getAssembly1toN = (n) => {
    if (n <= 1) return 1;
    return n * getAssembly1toN(n - 1);
  };

  printEvenNumbers1tN(10);
  console.log(numbers);
  console.log(getAssembly1toN(2));

const getFibonacciSequence = (n) => {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return getFibonacciSequence(n - 1) + getFibonacciSequence(n - 2);
}

})();
