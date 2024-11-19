let min = 1;
let max = 100;
let grades = []

for (i = 0; i <= 100; i++) {
    let randomInta = Math.floor(Math.random() * max);
    // document.write(`${randomInta} <br> `);
    grades.push(randomInta);
}
for (const grade in grades) {
    // document.write(`${grade} : ${grades[grade]} <br>`);
}
document.write(`The array number 1 is ${grades[0]} <br>`);
document.write(`The array number 5 is ${grades[4]} <br>`);
grades[1] = 100;

let sum = 0;
let average = 0;
for (const grade in grades) {
    sum += grades[grade];
    average = sum / grades.length;
}
document.write(`The sum of all the grades is ${sum} <br>`);