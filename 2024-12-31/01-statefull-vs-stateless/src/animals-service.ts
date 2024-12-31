import Animal from "./animal.js";

export default class AnimalsService {
    getAnimalsFromDatabase(): Animal[] {
        return[new Animal(20 ), new Animal(2), new Animal(4)];
    }
}

