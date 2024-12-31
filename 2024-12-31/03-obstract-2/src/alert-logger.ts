import Logger from "./logger.js";

export default class consoleLogger extends Logger{
    log(message:string):void{
        alert(message)
    }
}