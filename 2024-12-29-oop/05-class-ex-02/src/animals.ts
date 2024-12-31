export default class Animals {
    constructor(
        public readonly color: string,
        public readonly breed: string,
        public price: number
    ) {}

    public display(){
        console.log(`color: ${this.color}`)
        console.log(`breed: ${this.breed}`)
        console.log(`price: ${this.price}`)
    }
}