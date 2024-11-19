let width = +prompt("please enter the width of your box");
let height = +prompt("please enter the height of your box");

if ( width <= 0 && height <= 0) {
    document.write("wrong number")
} else {
let box = '';
for (let i = 0; i < width; i++) {
let boxwidth = '';

boxwidth += ' *'.repeat(width);
boxwidth += '<br>';
box = boxwidth.repeat(height);
}
// document.write(box)
document.write('<pre>' + box + '<pre/>')
}
