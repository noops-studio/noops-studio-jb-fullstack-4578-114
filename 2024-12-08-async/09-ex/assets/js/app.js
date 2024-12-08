"use strict";

(() => {

    const getPowr = num => {
        return new Promise((resolve, reject) => {
            if (num % 3 === 0) reject('Number is divisible by 3');
            resolve(num ** 2);
        }

        )
    }
    document.getElementById('btn').addEventListener('click',  () => {
        const num = +prompt('Enter a number');
        getPowr(num)
        .then(result => console.log(result))
        .catch(error => console.error(error))
    }
    )
})()