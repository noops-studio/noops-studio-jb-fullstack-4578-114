"use strict";

(async () => {

    const getNumberOfCandles = (dayNumber) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (dayNumber < 1) return reject('dayNumber must be greater than 0');
                if (dayNumber > 8) return reject('no Isru Chag in Hanukah');
                resolve(dayNumber + 1)
            }, 3000)
        })
    }

    try {
        let result
        let result2
        console.log('A')
        result = await getNumberOfCandles(1)
        console.log('B')
        result2 = await getNumberOfCandles(2)
        console.log('C')
        console.log(result)
        console.log(result2)
    } catch (error) {
        console.error(error)
        
    }
})()
