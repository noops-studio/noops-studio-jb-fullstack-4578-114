import Person from "./person.js";

class Supplier extends Person{
    constructor(
        name:string,
        birthdate:Date,
        private deliveries:number[]
    ) {
      super(name,birthdate)  
    }
}