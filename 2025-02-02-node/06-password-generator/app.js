const {generatePassword} = require('./password-generator');

const password = generatePassword(12);
console.log(password);