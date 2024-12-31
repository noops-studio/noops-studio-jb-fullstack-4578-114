// app.ts
import { Mobile } from './mobile.js';
// Display the number of devices created before creating objects
console.log("Total Mobiles Created: ".concat(Mobile.totalMobilesCreated));
// Create objects of type Mobile
var iphone = new Mobile('iPhone', 6.1, 999, 2, '1234');
var samsung = new Mobile('Samsung', 6.7, 799, 3, '5678');
// Display the number of devices created after creating the objects
console.log("Total Mobiles Created: ".concat(Mobile.totalMobilesCreated));
// Call methods on the objects
iphone.turnOn();
iphone.takePicture();
iphone.displayAd();
iphone.unlockDevice('1234'); // Unlocks the device
samsung.turnOn();
samsung.takePicture();
samsung.displayAd();
samsung.unlockDevice('1111'); // Incorrect attempt to unlock the device
iphone.turnOff();
samsung.turnOff();
