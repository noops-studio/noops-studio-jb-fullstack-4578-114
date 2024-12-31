import Person from "./person.js";
class Client extends Person {
    orders;
    constructor(name, birthdate, orders) {
        super(name, birthdate);
        this.orders = orders;
    }
}
