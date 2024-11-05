// for(let num =-100 ; num < 100 ; num++ ){
//     document.write('<br>' + num)
// }

// let num1 = +prompt("enter the first number");
// let num2 = +prompt("enter the first number");

// let min = null;
// let max = null;

// if(num1 < num2){
//     // document.write(` biggest is num2`)
//     max = num2;
//     min = num1;
// }else{
//     // document.write(`biggest number is num1`)
//     max = num1;
//     min = num2;
// }

// for(let i = min ; i <= max ; i++){
//     document.write(`<br>${i}`)
// }

// let n = +prompt("enter a number")

// for(let i = 1; i <= n ; i++ ){
// document.write("<br>" + i ** 2)

// }
const delay = 2000;
for(let row = 1; row <= 10 ; row++){

    for(let i = 1; i <= 10 ; i++){
        setTimeout(() => {
            document.write('*');
        }, (row - 1) * i * delay + (i - 1) * delay);
    }
document.write('<br>')
}