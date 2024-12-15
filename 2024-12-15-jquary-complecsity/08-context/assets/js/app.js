"use strict";

(() => {
  function sayThis() {
    console.log(this);
  }

  console.log(this);
  document.getElementById("paintGreen").addEventListener("click", function () {
    this.style.backgroundColor = "green";
  });
  document.getElementById("sayHello").addEventListener("click", sayThis);
  document.getElementById("paintGreen").addEventListener("click", function () {
    this.style.backgroundColor = "green";
  });
  document.getElementById("paintTimeoutGreen").addEventListener("click", function () { const that = this;
      setTimeout(() => {
        that.style.backgroundColor = "green";
      }, 1000);
    });

  sayThis();
})();
