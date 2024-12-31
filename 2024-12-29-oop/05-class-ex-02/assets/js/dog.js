export default class Dog {
    color;
    breed;
    price;
    istrained;
    constructor(color, breed, price, istrained) {
        this.color = color;
        this.breed = breed;
        this.price = price;
        this.istrained = istrained;
    }
    display() {
        console.log(`color: ${this.color}`);
        console.log(`breed: ${this.breed}`);
        console.log(`price: ${this.price}`);
        console.log(`istrained: ${this.istrained}`);
    }
}
