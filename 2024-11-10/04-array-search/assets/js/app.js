//create an araay of random numbers bitweean -100 to 100
let maxnum = 100;
let minnum = 0;
let numbers = [];
// let count = 100;
//create a random number between -100 to 100
function randomNum() {
  return parseInt(Math.floor(Math.random() * (maxnum - minnum + 1)) + minnum);
}
//create an array of 100 random numbers
for (let i = 0; i < 100; i++) {
  numbers.push(randomNum());
}
document.write(numbers)
console.log(numbers)

// array search
let count = 0;
const guess = +prompt('guess a number in the array');
for (const number of numbers ) {
    if (number === guess) {
count++
    }
}
let indexes = []
for(let i=0; i < numbers.length; i++){
if (numbers[i] === guess) {
indexes.push(i)    
}

}


alert(count > 0 ? `bingo found ${guess} ${count} times`: 'No Bingo')