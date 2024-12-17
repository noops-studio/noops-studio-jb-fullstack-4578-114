"use strict";

(() => {
  let x = 1
  let y = 2

  x = '1'

  console.log(x + y)

  //bad 2

  function sum (a,b) {
    return a + b
    }

    sum = 'x'
    console.log(sum(1,2))

    //bad 3
    function multiply (a,b) {
      const result = a * b
      return result
      }

      console.log(multiply(2,3))
})();