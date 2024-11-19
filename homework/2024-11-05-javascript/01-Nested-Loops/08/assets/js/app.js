let n = +prompt("enter a number");
let n2 = '';
n2 += n
let printer ='';

for (let i = n; i > 0; i--) {
let newline = '';
for (let j = 1; j <+ i; j++) {
newline += j + ' '  
}
printer += newline + "<br>"
}


document.write(printer)
