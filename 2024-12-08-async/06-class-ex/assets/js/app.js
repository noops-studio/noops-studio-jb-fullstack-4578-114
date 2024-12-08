"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const  getPower = (num, successCallback, errorCallback) => {
        setTimeout(() => {
            if (num % 3 === 0) return errorCallback('number cant be divisible by 3');
            successCallback(num ** 2);
        }, 3000); 
    }

    document.getElementById('numberator').addEventListener('click', () => {
        const number = +prompt('Enter a number');
        getPower(number, (result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });
    });
});