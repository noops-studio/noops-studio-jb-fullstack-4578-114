import Animals from './animals.js';
export default class Cat extends Animals {
    numberOfSoulsLeft;
    constructor(color, breed, price, numberOfSoulsLeft) {
        super(color, breed, price);
        this.numberOfSoulsLeft = numberOfSoulsLeft;
    }
    display() {
        console.log(`color: ${this.color}`);
        console.log(`breed: ${this.breed}`);
        console.log(`price: ${this.price}`);
        console.log(`numberOfSoulsLeft: ${this.numberOfSoulsLeft}`);
    }
}
