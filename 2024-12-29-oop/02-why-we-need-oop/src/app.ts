const carMake = 'Opal';
const carModel = 'Corsa';
const carYear = 2012;
const carPrice = 13000;

function igniteCar(carMake: string) {
  console.log('Car is ignited' + carMake);
}


const car = {
  make: 'Opal',
  model: 'Corsa',
  disel: true,
  yearMade: 2012,
  price: 13000,
  igniteCar: (carMake: string) => {
    console.log('Car is ignited' + carMake);
  }
};


type car ={
  make: string,
  model: string,
  year: number,
  diesel: boolean,
  price: number,
  ignite: Function
}

const nissanMicra: car = {
  make: 'Nissan',
  model: 'Micra',
  year: 2010,
  diesel: true,
  price: 10000,
  ignite: function(carMake: string){
      console.log(`starting.....`);;
  }
}

const nissanMaxima: car = {
  make: 'Nissan',
  model: 'Maxima',
  year: 2015,
  diesel: false,
  price: 20000,
  ignite: function(carMake: string){
      console.log(`igniting.....`);;
  }
}