import Person from "./person.js";

class Client extends Person{
    constructor(
        name:string,
        birthdate:Date,
        private orders:number[]
    ) {
      super(name,birthdate)  
    }
}