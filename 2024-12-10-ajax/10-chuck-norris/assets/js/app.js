"use strict";

(() => {

    const getData = async (url) => {
        const response = await fetch(url);
        return await response.json();
    }

    const generateHtml = async (url) => {
        const joke = await getData(url);
        const { value } = joke;
        const newHtml = `<tr>
            <td>${value}</td>
        </tr>`;
        return newHtml;
    }
let canWork = false;
    document.getElementById('joker1').addEventListener('click',  () => {
canWork = true;
    });

// now will do a time interval for 5 sec
    setInterval(async () => {
        if (!canWork) {
            return;
        }
        const url = 'https://api.chucknorris.io/jokes/random';
        const newHtml = await generateHtml(url);
        document.getElementById('joke-content').innerHTML = newHtml;
    }, 5000);
})();