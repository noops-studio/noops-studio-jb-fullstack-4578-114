import Dog from './dogs.js';
import Cat from './cat.js';
const dog: Dog = {
name: 'Noop',
wheight: 30,
breed: 'Afghan Hound'
}

function clone<T>(obj: T): T {
return {...obj}
}

const aDuplicationofDog = {...dog}
const anoutherDuplicationofDog = clone<Dog>(dog)
console.log(anoutherDuplicationofDog)
console.log(aDuplicationofDog)
console.log(dog)

const cat: Cat = {
name: 'citty',
wheight: 10,
numberOfSouls: 9
}

const aDuplicationofCat = {...cat}
const anoutherDuplicationofCat = clone<Cat>(cat)
console.log(anoutherDuplicationofCat)
console.log(aDuplicationofCat)


const wierdOBJ = clone({name: 'kkk', wheight: 10, numberOfSouls: 9})
console.log(wierdOBJ)