let n = +prompt("enter a number  ")
let printer = [];

function makeline(many){

    let line ='';
    console.log(line)
    for (let i = 1; i <= many; i++) {
line += i + ' '        
    }
    console.log(`makeline line = ${line}`)
    return line
}


for (let i = 1; i <= n ; i++) {
printer.push(makeline(i))
}

for (let i = n; i >= 1 ; i--) {
    printer.push(makeline(i))  
}

// document.write(printer.join('<br>'))
console.log(printer)