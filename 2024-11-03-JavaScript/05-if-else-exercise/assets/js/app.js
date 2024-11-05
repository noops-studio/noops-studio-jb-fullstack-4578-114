let num1 = prompt(`please enter your first number`);
let num2 = prompt(`please enter your first number`);

// convert the parameter into a integer value
// num1 = parseInt(num1);
// num2 = parseInt(num2);

// convert into a decimal parameter
// num1 = parseFloat(num1);
// num2 = parseFloat(num2);

// ore we can add + sign before the string
num1 = +num1;
num2 = +num2;


if(num1 > num2){
document.write(`the biggest is ${num1}`);

}else {
document.write(`the biggest is ${num2}`);

}  