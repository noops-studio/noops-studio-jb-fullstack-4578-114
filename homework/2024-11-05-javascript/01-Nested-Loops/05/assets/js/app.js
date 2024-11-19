let n = +prompt("please enter a number")

if ( n <= 0) {
    document.write("wrong number")
} else {
let box = '';
for (let index = 0; index < n; index++) {
box += ' *'.repeat(n);
box += '<br>'
}
// document.write(box)
document.write('<pre>' + box + '<pre/>')
}
