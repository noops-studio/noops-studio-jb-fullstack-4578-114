import AnimalsService from "./animals-service.js";

const animalsService = new AnimalsService
const animals = animalsService.getAnimalsFromDatabase();

console.log(animals);

// const animalsService2 = new AnimalsService;
// const animals2 = animalsService2.getAnimalsFromDatabase();

// console.log(animals2);