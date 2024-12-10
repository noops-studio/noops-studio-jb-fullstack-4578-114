"use strict";

(() => {
    const getLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
    document.getElementById('button').addEventListener('click', async () => {
        try {
            const position = await getLocation()
            console.log(position)
        } catch (e) {
            console.log(e.massasge)
        }
    });

})();