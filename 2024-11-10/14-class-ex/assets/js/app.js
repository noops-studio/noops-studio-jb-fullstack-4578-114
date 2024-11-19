const massage = prompt('Enter a massage');
massage = massage.trim()


//via split
const massageArray = massage.split(' ');
console.log(`The first word is: ${massageArray[0]}`);
console.log(`The last word is: ${massageArray[massageArray.length - 1]}`);
document.write(`The first word is: ${massageArray[0]}<br>`);
document.write(`The last word is: ${massageArray[massageArray.length - 1]}`);

// via substring
const firstSpace = massage.indexOf(' ');
const lastSpace = massage.lastIndexOf(' ');
const firstWord = massage.substring(0, firstSpace);
const lastWord = massage.substring(lastSpace + 1);
console.log(`The first word is: ${firstWord}`);
console.log(`The last word is: ${lastWord}`);