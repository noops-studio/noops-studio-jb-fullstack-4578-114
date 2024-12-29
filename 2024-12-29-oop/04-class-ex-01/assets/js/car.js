var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.drive = function () {
        console.log("I am driving a ".concat(this.make, " ").concat(this.model));
    };
    return Car;
}());
export default Car;
