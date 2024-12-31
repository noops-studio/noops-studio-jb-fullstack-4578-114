// mobile.ts
var Mobile = /** @class */ (function () {
    // Constructor with shortened syntax
    function Mobile(type, screenSize, price, numberOfCameras, pinCode) {
        this.type = type;
        this.screenSize = screenSize;
        this.price = price;
        this.numberOfCameras = numberOfCameras;
        this.pinCode = pinCode;
        Mobile.totalMobilesCreated++;
    }
    // Methods
    Mobile.prototype.takePicture = function () {
        console.log("".concat(this.type, ": Taking a picture using one of its ").concat(this.numberOfCameras, " cameras."));
    };
    Mobile.prototype.turnOn = function () {
        console.log("".concat(this.type, ": Turning on."));
    };
    Mobile.prototype.turnOff = function () {
        console.log("".concat(this.type, ": Turning off."));
    };
    Mobile.prototype.displayAd = function () {
        console.log("For Sale: ".concat(this.type, " with a ").concat(this.screenSize, "-inch screen for just $").concat(this.price, "!"));
    };
    // Function to verify the pin code
    Mobile.prototype.unlockDevice = function (inputPin) {
        if (inputPin === this.pinCode) {
            console.log("".concat(this.type, ": Device unlocked successfully."));
        }
        else {
            console.log("".concat(this.type, ": Incorrect PIN. Try again."));
        }
    };
    Mobile.totalMobilesCreated = 0; // Static member to track the number of created devices
    return Mobile;
}());
export { Mobile };
