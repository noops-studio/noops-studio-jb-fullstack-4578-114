export default class Dog {

    constructor(
        private readonly color: string,
        private readonly breed: string,
        private price: number,
        private istrained: boolean,
    ) {}

    public display(){
        console.log(`color: ${this.color}`)
        console.log(`breed: ${this.breed}`)
        console.log(`price: ${this.price}`)
        console.log(`istrained: ${this.istrained}`)
    }

}
