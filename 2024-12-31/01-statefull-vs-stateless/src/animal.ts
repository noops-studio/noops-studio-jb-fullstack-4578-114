export default class Animal {

    public constructor(
        private numberOfLungs: number

    ){}
    breath() {
        console.log(`Breathing with ${this.numberOfLungs}  lungs`);
    }
}