export default class Car {
    public make: string;
    public model: string;
    public diesel: boolean;
    public year: number;
    public price: number;
    private serialNumber?: string; 

    public vat = 17;
    public massage: () => void;

    constructor(make: string, model: string, diesel: boolean, year: number, price: number) {
        this.make = make;
        this.model = model;
        this.diesel = diesel;
        this.year = year;
        this.price = price;
        this.initializeSerialNumber();
        this.massage = function saleMassage() {console.log(`The ${this.make} ${this.model} is on sale for ${this.price}$!`);};
    }

    private async initializeSerialNumber(): Promise<void> {
        this.serialNumber = await Car.hashData(
            `${this.make}${this.model}${this.year}${this.price}`
        );
    }

    drive() {
        console.log(`I am driving a ${this.make} ${this.model}`);
    }

    static async hashData(data: string): Promise<string> {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);
        const hashBuffer = await crypto.subtle.digest('SHA-512', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    public getFullPrice(): number {
        return this.price + this.price * this.vat / 100;
    }
}
