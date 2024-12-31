// mobile.ts
export class Mobile {
    static totalMobilesCreated: number = 0; // Static member to track the number of created devices
  
    // Constructor with shortened syntax
    constructor(
      public type: string,
      public screenSize: number,
      public price: number,
      public numberOfCameras: number,
      private pinCode: string
    ) {
      Mobile.totalMobilesCreated++;
    }
  
    // Methods
    takePicture(): void {
      console.log(`${this.type}: Taking a picture using one of its ${this.numberOfCameras} cameras.`);
    }
  
    turnOn(): void {
      console.log(`${this.type}: Turning on.`);
    }
  
    turnOff(): void {
      console.log(`${this.type}: Turning off.`);
    }
  
    displayAd(): void {
      console.log(`For Sale: ${this.type} with a ${this.screenSize}-inch screen for just $${this.price}!`);
    }
  
    // Function to verify the pin code
    unlockDevice(inputPin: string): void {
      if (inputPin === this.pinCode) {
        console.log(`${this.type}: Device unlocked successfully.`);
      } else {
        console.log(`${this.type}: Incorrect PIN. Try again.`);
      }
    }
  }
  