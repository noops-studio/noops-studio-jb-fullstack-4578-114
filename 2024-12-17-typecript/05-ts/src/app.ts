let x: number = 1;
let y = 2;

// x = '1'
let z: string = "hello";
let t: string = "world";
console.log(x + y);

console.log(z + t);

// bad 2
function sum(a: number, b: number): number {
  return a + b;
}
console.log(sum(1, 2));

// bad 3

function multiply(a: number, b: number): number {
  const result = a * b;
  return result;
}

console.log(multiply(2, 3));
