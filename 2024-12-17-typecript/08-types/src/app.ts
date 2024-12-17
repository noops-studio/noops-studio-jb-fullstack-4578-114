const age: number = 22;
const message: string = "Hello World";
const isActive: boolean = true;

const ages: number[] = [22, 23, 24];
// arrays
const mesages: string[] = ["Hello", "World"];
const someFlug: boolean[] = [true, false, true];
// objects
const person: { name: string; age: number } = {
  name: "Alex",
  age: 22,
};

// functions
const greet = (name: string): string => {
  return `Hello ${name}`;
};

const log = (message: string) => {
  console.log(message);
};

// null
let n: null = null;
type Person = { age: number; name: string; birthdate: Date };
const shay: Person = {
  age: 22,
  name: "shay",
  birthdate: new Date(),
};

console.log(shay);

let somthing: any;

somthing = 22;
console.log(typeof somthing);

let myUndifined: undefined;
console.log(`myUndifined: ${myUndifined}`);
let myNull: null;
console.log(`myNull: ${myNull}`);
let myUnknown: unknown;
console.log(`myUnknown: ${myUnknown}`);
let myAny: any;
console.log(`myAny: ${myAny}`);
let myNever: never;
console.log(`myNever: ${myNever}`);

// yuval is a person
const yuval: Person = {
  age: 22,
  name: "yuval",
  birthdate: new Date(),
};

//arrays of objects
const students: Person[] = [shay, yuval];

console.log(students);

const animals: { type: string; eat: Function }[] = [];
animals.push({ type: "dog", eat: () => console.log("dog eat") });
animals.push({ type: "cat", eat: () => console.log("cat eat") });
console.log(animals);