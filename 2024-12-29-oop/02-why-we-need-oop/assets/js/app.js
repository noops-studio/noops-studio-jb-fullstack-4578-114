"use strict";
var carMake = 'Opal';
var carModel = 'Corsa';
var carYear = 2012;
var carPrice = 13000;
function igniteCar(carMake) {
    console.log('Car is ignited' + carMake);
}
var car = {
    make: 'Opal',
    model: 'Corsa',
    year: 2012,
    price: 13000,
    igniteCar: function (carMake) {
        console.log('Car is ignited' + carMake);
    }
};
igniteCar('BMW');
car.igniteCar('HPW');
