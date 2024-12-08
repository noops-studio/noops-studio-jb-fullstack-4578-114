"use strict";

(() => {

    const getNumberOfCandles = (dayNumber) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (dayNumber < 1) return reject('dayNumber must be greater than 0');
                if (dayNumber > 8) return reject('no Isru Chag in Hanukah');
                resolve(dayNumber + 1)
            }, 300)
        })
    }
    let sum = 0
    getNumberOfCandles(1)
        .then(result => {
            return result
        })
        .then(result => {
            sum += result
            return getNumberOfCandles(2)
        })
        .then(result => {
            sum += result
            return getNumberOfCandles(3)
        })
        .then(result => {
            sum += result
            return getNumberOfCandles(4)
        })
        .then(result => {
            sum += result
            return getNumberOfCandles(5)
        })
        .then(result => {
            sum += result
            return getNumberOfCandles(6)
        })
        .then(result => {
            sum += result
            return getNumberOfCandles(7)
        })
        .then(result => {
            sum += result
            return getNumberOfCandles(8)
        }).then(result => {
            sum += result
        })
        .then(result => { console.log(`Total number of candles: ${sum}`) })
        .catch(error => console.log(error))
})()