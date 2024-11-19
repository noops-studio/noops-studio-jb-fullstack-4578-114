let totalnum = 0;
let num = null;
while(num > 0 || num !== 0){
num = +prompt("please enter a number")
if (num > 0) {
    totalnum += num
}
}
// document.write(totalnum)
console.log(` num is ${num}`)
console.log(` totalnum is ${totalnum}`)

i = 1;
while(i <= totalnum){
if (i % 2 == 0) {
document.write(`${i} <br>`);
}
i++
}