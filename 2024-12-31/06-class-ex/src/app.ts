import AlertLogger from "./alert-logger.js";
import ConsoleLogger from "./console-logger.js";
import Logger from "./logger.js";

function getLogger(name: string): Logger {
  if (name === "alert") {
    return new AlertLogger();
  } else {
    return new ConsoleLogger();
  }
}
const logger = getLogger("alert");
logger.log("Hello World!");
console.log(getLogger("alert").log("Hello World!"));
console.log(getLogger("console").log("Hello World!"));
