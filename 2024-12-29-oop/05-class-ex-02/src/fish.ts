import { Animals } from './animals.js'
export class Fish extends Animals {
    constructor(
        color: string,
        breed: string,
        price: number,
        private isFreshWater: number
    ) {
        super(color, breed, price)
    }

    public display(){
        console.log(`color: ${this.color}`)
        console.log(`breed: ${this.breed}`)
        console.log(`price: ${this.price}`)
        console.log(`isFreshWater: ${this.isFreshWater}`)
    }
}
