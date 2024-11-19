let n = +prompt("enter a number  ")
let newline ='';
for (let i = n; i > 0; i--) {
newline += i + ' ';
}
let printer = ( newline + '<br>').repeat(n)
document.write(printer)