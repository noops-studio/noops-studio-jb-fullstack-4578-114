"use strict";

(() => {
    let candles = 0;
    const getNumberOfCandles = (dayNumber) => {
        return new Promise((resolve, reject) => {
            console.log(dayNumber);
            setTimeout(() => {
                if (dayNumber < 1) return reject('Day number should be greater than 0');
                if (dayNumber > 8) return reject('no Isru Chag in Hanukkah');
                resolve(dayNumber + 1);
            }, 300);
        });
    };

    const processDays = async (day = 1) => {
        if (day > 8) {
            console.log(`Total number of candles: ${candles}`);
            return;
        }
        try {
            const num = await getNumberOfCandles(day);
            candles += num;
            await processDays(day + 1);
        } catch (error) {
            console.error(error);
        }
    };

    processDays();
})();