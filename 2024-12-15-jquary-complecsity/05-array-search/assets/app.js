"use strict";

(() => {
    
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const search = prompt('Enter a number to search in the array:');

    const index = arr.indexOf(search);

    if (index !== -1) {
        alert(`Found ${search} at index ${index}`);
    } else {
        alert(`${search} not found`);
    }

})();