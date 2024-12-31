import AnimalsService from "./animals-service.js";
const animalsService = new AnimalsService;
const animals = animalsService.getAnimalsFromDatabase();
console.log(animals);
