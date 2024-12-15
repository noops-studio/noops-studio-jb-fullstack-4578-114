"use strict";

(() => {
    
const mySet = new Set();
mySet.add('Beery');
mySet.add('Beery');
mySet.add('Yuval');
mySet.add('Mishel');

const myNonUniqueArray = [10,10,20,20,30,30,40,40,50,50];
const myUniqueSet = new Set([10,10,20,20,30,30,40,40,50,50]);
const myUniqueArray = [...myUniqueSet];
console.log(myUniqueArray)
})();