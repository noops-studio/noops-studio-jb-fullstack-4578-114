import Animals from './animals.js'
export default class Cat extends Animals{

    constructor(
         color: string,
         breed: string,
         price: number,
        private numberOfSoulsLeft: number
    ) {
        super(color, breed, price)
    }

    public display(){
        console.log(`color: ${this.color}`)
        console.log(`breed: ${this.breed}`)
        console.log(`price: ${this.price}`)
        console.log(`numberOfSoulsLeft: ${this.numberOfSoulsLeft}`)
    }

}
