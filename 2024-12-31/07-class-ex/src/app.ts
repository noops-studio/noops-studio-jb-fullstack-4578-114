import Shape from "./shape.js";
import Square from "./square.js";
import Circle from "./circle.js";
import Rectangle from "./rectangle.js";
function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function createRandomShape(choice: number): Shape {
  switch (choice) {
      case 1:
          const sideLength = getRandomNumber(1, 10);
          console.log(`Creating a square with side length: ${sideLength}`);
          return new Square(sideLength);
      case 2:
          const radius = getRandomNumber(1, 10);
          console.log(`Creating a circle with radius: ${radius}`);
          return new Circle(radius);
      case 3:
          const length = getRandomNumber(1, 10);
          const width = getRandomNumber(1, 10);
          console.log(`Creating a rectangle with length: ${length} and width: ${width}`);
          return new Rectangle(length, width);
      default:
          throw new Error("Invalid choice");
  }
}

function getUserInput(): void {
  const input = prompt("Enter a number (1 for square, 2 for circle, 3 for rectangle): ");
  const choice = parseInt(input?.trim() || "0", 10);

  if (isNaN(choice) || choice < 1 || choice > 3) {
      console.error("Invalid input. Please enter a number between 1 and 3.");
      return;
  }

  const shape = createRandomShape(choice);
  console.log(`The area of the shape is: ${shape.getArea()}`);
}

getUserInput();
