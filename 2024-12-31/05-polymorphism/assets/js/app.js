import Client from "./client.js";
import Employee from "./employee.js";
import Supplier from "./supplier.js";
const freddy = new Client('freddy', new Date(), [90, 30, 20]);
freddy.printName();
const George = new Employee('George', new Date(), [6000, 6200, 6000]);
George.printName();
const Jessica = new Supplier('Jessica', new Date(), [400, 500]);
Jessica.printName();
const totalRevenue = freddy.calcRevenue() + George.calcRevenue() + Jessica.calcRevenue();
console.log(`total revenue: ${totalRevenue}`);
function sendNewYearGreeting(person) {
    console.log(`happy new year ${person.name}`);
}
sendNewYearGreeting(freddy);
sendNewYearGreeting(George);
sendNewYearGreeting(Jessica);
