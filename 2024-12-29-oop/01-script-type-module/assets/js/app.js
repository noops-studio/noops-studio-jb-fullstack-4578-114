"use strict";
var x = 1;
var y = 2;
// x = '1'
var z = "hello";
var t = "world";
console.log(x + y);
console.log(z + t);
// bad 2
function sum(a, b) {
    return a + b;
}
console.log(sum(1, 2));
// bad 3
function multiply(a, b) {
    var result = a * b;
    return result;
}
console.log(multiply(2, 3));
