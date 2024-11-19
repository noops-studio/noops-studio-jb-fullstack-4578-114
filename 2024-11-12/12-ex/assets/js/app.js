const getRandNum = () => {
  return parseInt(Math.random() * 100) +1;
}

function printMax(a, b) {
  console.log(a > b ? a : b)
}

function randomNumber() {
  const number = parseInt(Math.random() * 100)
}

printMax(4, 9)
printMax(getRandNum(), getRandNum()) // remember this line



const num1 = +prompt('enter a number')
const num2 = +prompt('enter a number')

printMax(num1, num2)