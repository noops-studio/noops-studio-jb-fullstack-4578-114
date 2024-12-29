export default class Car {
    make: string
    model: string
    diesel: boolean
    year: number
    price: number

    drive(){
        console.log(`I am driving a ${this.make} ${this.model}`);
    }
}