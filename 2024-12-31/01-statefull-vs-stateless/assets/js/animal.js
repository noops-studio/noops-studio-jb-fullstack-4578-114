export default class Animal {
    numberOfLungs;
    constructor(numberOfLungs) {
        this.numberOfLungs = numberOfLungs;
    }
    breath() {
        console.log(`Breathing with ${this.numberOfLungs}  lungs`);
    }
}
