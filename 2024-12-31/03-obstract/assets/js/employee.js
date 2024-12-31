import Person from "./person.js";
class Employee extends Person {
    salaries;
    constructor(name, birthdate, salaries) {
        super(name, birthdate);
        this.salaries = salaries;
    }
}
