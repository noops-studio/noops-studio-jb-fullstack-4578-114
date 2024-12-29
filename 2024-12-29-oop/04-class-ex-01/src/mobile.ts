export default class Mobile {
    private type: string;
    private screenSize: number;
    private price: number;
    private numberOfCamera: number;
    private fourDigitPin: number = Math.floor(Math.random() * 9000) + 1000;

    turnOff() {
        console.log(`${this.type} is turning off`)
    }

    turnOn(): void {
        console.log(`${this.type} is turning on`);
    }

    takePicture(): void {
        console.log(`${this.type} is taking a picture`);
    }

    getPincode(): number { 
        console.log(this.fourDigitPin);
        return this.fourDigitPin;
    }

    constructor(type: string, screenSize: number, price: number, numberOfCamera: number) {
        this.type = type;
        this.screenSize = screenSize;
        this.price = price;
        this.numberOfCamera = numberOfCamera;
    }
}