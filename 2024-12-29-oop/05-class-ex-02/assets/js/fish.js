import { Animals } from './animals.js';
export class Fish extends Animals {
    isFreshWater;
    constructor(color, breed, price, isFreshWater) {
        super(color, breed, price);
        this.isFreshWater = isFreshWater;
    }
    display() {
        console.log(`color: ${this.color}`);
        console.log(`breed: ${this.breed}`);
        console.log(`price: ${this.price}`);
        console.log(`isFreshWater: ${this.isFreshWater}`);
    }
}
