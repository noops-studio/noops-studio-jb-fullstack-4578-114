const dog = {
    name: 'Noop',
    wheight: 30,
    breed: 'Afghan Hound'
};
function clone(obj) {
    return { ...obj };
}
const aDuplicationofDog = { ...dog };
const anoutherDuplicationofDog = clone(dog);
console.log(anoutherDuplicationofDog);
console.log(aDuplicationofDog);
console.log(dog);
const cat = {
    name: 'citty',
    wheight: 10,
    numberOfSouls: 9
};
const aDuplicationofCat = { ...cat };
const anoutherDuplicationofCat = clone(cat);
console.log(anoutherDuplicationofCat);
console.log(aDuplicationofCat);
const wierdOBJ = clone({ name: 'kkk', wheight: 10, numberOfSouls: 9 });
console.log(wierdOBJ);
export {};
