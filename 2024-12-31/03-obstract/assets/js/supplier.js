import Person from "./person.js";
class Supplier extends Person {
    deliveries;
    constructor(name, birthdate, deliveries) {
        super(name, birthdate);
        this.deliveries = deliveries;
    }
}
