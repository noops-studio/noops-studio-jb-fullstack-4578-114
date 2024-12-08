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

        // for(const dayNumber of [1,2,3,4,5,6,7,8]) {
        //         const result = await getNumberOfCandles(dayNumber)
        //         console.log(result)
        //     }

        const promises = [1, 2, 3, 4, 5, 6, 7, 8].map(dayNumber => getNumberOfCandles(dayNumber))
        console.log(promises)
        result = await Promise.all(promises)
        console.log(result)
        const candlesOfHanukkah = result.reduce((acc, candles) => acc + candles, 0)
        console.log(candlesOfHanukkah)




    } catch (error) {
        console.error(error)

    }
})()
