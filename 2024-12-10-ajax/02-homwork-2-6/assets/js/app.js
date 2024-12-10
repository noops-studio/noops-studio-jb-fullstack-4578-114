"use strict";

(() => {

    const getPizzaFromServerAsync = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const randomNumber = Math.floor(Math.random() * 100)
                if (randomNumber % 2 === 0) {
                    resolve('here is your pizza')
                } else {
                    reject('no pizza today')
                }
            }, 1000);
        })
    }

    document.getElementById('button').addEventListener('click', () => {
        getPizzaFromServerAsync()
            .then(console.log)
            .catch(console.error)

    })

})()