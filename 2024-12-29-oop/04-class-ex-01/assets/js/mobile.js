var Mobile = /** @class */ (function () {
    function Mobile(type, screenSize, price, numberOfCamera) {
        this.fourDigitPin = Math.floor(Math.random() * 9000) + 1000;
        this.type = type;
        this.screenSize = screenSize;
        this.price = price;
        this.numberOfCamera = numberOfCamera;
    }
    Mobile.prototype.turnOff = function () {
        console.log("".concat(this.type, " is turning off"));
    };
    Mobile.prototype.turnOn = function () {
        console.log("".concat(this.type, " is turning on"));
    };
    Mobile.prototype.takePicture = function () {
        console.log("".concat(this.type, " is taking a picture"));
    };
    Mobile.prototype.getPincode = function () {
        console.log(this.fourDigitPin);
        return this.fourDigitPin;
    };
    return Mobile;
}());
export default Mobile;
