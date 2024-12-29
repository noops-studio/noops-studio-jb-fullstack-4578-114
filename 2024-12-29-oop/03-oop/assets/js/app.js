import Car from './car.js';
const micra = new Car('Nissan', 'Micra', true, 2010, 10000);
const maxima = new Car('Nissan', 'Maxima', false, 2015, 20000);
const modelX = new Car('Tesla', 'Model X', false, 2018, 80000);
console.log(modelX.massage());
console.log(micra);
