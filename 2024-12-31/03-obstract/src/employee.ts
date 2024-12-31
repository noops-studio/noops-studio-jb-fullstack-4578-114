import Person from "./person.js";

class Employee extends Person{
    constructor(
        name:string,
        birthdate:Date,
        private salaries:number[]
    ) {
      super(name,birthdate)  
    }
}