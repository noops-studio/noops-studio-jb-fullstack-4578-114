"use strict";
(() => {

    const generate7BoomAfterDelayAsync = (min, max) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
                if (randomNum % 7 === 0 || randomNum.toString().endsWith('7')) {
                    resolve(randomNum);
                } else {
                    reject(`Failed: ${randomNum} is not divisible by 7 and does not end with 7.`);
                }
            }, 1000);
        });
    };

    document.getElementById('generate').addEventListener('click', () => {
        const min = parseInt(document.getElementById('min').value, 10);
        const max = parseInt(document.getElementById('max').value, 10);
        const resultDiv = document.getElementById('result');

        if (isNaN(min) || isNaN(max) || min >= max) {
            resultDiv.textContent = 'Please enter valid minimum and maximum values.';
            return;
        }

        resultDiv.textContent = 'Generating...';

        generate7BoomAfterDelayAsync(min, max)
            .then((successMessage) => {
                resultDiv.textContent = `Success: 7 Boom! The number is ${successMessage}`;
            })
            .catch((errorMessage) => {
                resultDiv.textContent = errorMessage;
            });
    });

})();