const { generatePassword } = require("noops-studio-password-generator");

const password = generatePassword(10002,true);
console.log(password);