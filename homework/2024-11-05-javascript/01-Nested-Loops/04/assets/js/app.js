let totalnum = 0;
let num = null;
while (num > 0 || num !== 0) {
    num = +prompt("please enter a number")
    if (num > 0) {
        totalnum += num
    }
}
// document.write(totalnum)
console.log(` num is ${num}`)
console.log(` totalnum is ${totalnum}`)

let i2 = totalnum
i = 1;
while (i <= totalnum) {

    if (i2 % 2 == 0) {
        document.write(`${i2} <br>`);
    }

    i2--;
    i++;
}