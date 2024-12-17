"use strict";

(() => {
  document.getElementById("b1").addEventListener("click", () => {
    printStars(10);
  });

  //   const printStars = (n) => {
  //     for (let i = 0; i <= n; i++) {
  // document.write('* ')
  //     }
  //   }

  const printStars = (n) => {
if (n <= 0) return
document.write('* ')
printStars(n-1)
  };
})();
