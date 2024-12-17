const age = 22;
const message = "Hello World";
const isActive = true;
const ages = [22, 23, 24];
// arrays
const mesages = ["Hello", "World"];
const someFlug = [true, false, true];
// objects
const person = {
    name: "Alex",
    age: 22,
};
// functions
const greet = (name) => {
    return `Hello ${name}`;
};
const log = (message) => {
    console.log(message);
};
// null
let n = null;
const shay = {
    age: 22,
    name: "shay",
    birthdate: new Date(),
};
console.log(shay);
let somthing;
somthing = 22;
console.log(typeof somthing);
let myUndifined;
console.log(`myUndifined: ${myUndifined}`);
let myNull;
console.log(`myNull: ${myNull}`);
let myUnknown;
console.log(`myUnknown: ${myUnknown}`);
let myAny;
console.log(`myAny: ${myAny}`);
let myNever;
console.log(`myNever: ${myNever}`);
// yuval is a person
const yuval = {
    age: 22,
    name: "yuval",
    birthdate: new Date(),
};
//arrays of objects
const students = [shay, yuval];
console.log(students);
const animals = [];
animals.push({ type: "dog", eat: () => console.log("dog eat") });
animals.push({ type: "cat", eat: () => console.log("cat eat") });
console.log(animals);
