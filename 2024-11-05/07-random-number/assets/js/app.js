

let mina = +prompt("enter first number");
let maxa =  +prompt("enter first number");


for(i = 0;i <= 100;i++){
let randomInta = Math.floor(Math.random() * (Math.floor(maxa) - Math.ceil(mina)) + Math.ceil(mina));
document.write(`${randomInta} <br> `);

}