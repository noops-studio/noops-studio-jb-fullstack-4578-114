export default class Animals {
    color;
    breed;
    price;
    constructor(color, breed, price) {
        this.color = color;
        this.breed = breed;
        this.price = price;
    }
    display() {
        console.log(`color: ${this.color}`);
        console.log(`breed: ${this.breed}`);
        console.log(`price: ${this.price}`);
    }
}
