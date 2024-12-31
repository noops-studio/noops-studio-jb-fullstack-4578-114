import Shape from "./shape.js";
export default class Square extends Shape {
    sideLength;
    constructor(sideLength) {
        super();
        this.sideLength = sideLength;
    }
    getArea() {
        return this.sideLength ** 2;
    }
}
