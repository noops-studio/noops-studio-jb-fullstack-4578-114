let n = +prompt("enter a number");
let n2 = '';
n2 += n
let printer ='';
while(n2 <= n && n2 >= 0){
console.log(n2)
printer += (' *').repeat(n2)
printer += '<br>'
n2--

}
document.write(printer)