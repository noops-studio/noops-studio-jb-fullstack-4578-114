"use strict";
( async() => {
    const getPower = (num) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (num % 3 === 0) return reject('number cant be divisible by 3');
                resolve(num ** 2);
            }, 3000);
        });
    };

    document.getElementById('numberator').addEventListener('click', async () => {
        const number = +prompt('Enter a number');
        try {
            const result = await getPower(number);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    });
})();




// document.addEventListener('DOMContentLoaded', () => {
//     const  getPower = (num, successCallback, errorCallback) => {
//         setTimeout(() => {
//             if (num % 3 === 0) return errorCallback('number cant be divisible by 3');
//             successCallback(num ** 2);
//         }, 3000); 
//     }

//     document.getElementById('numberator').addEventListener('click', () => {
//         const number = +prompt('Enter a number');
//         const result = await getPower(number);
//             console.log(result);
        
//         });
// });