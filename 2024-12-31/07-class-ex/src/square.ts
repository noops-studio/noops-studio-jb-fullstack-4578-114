import Shape from "./shape.js";

export default class Square extends Shape {
    constructor(private sideLength: number) {
        super();
    }
  
    getArea(): number {
        return this.sideLength ** 2;
    }
  }
  