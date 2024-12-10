"use strict";

(() => {

    const getData = async (url) => {
        const response = await fetch(url);
        return await response.json();
    }

    const generateHtml = async (url) => {
        const users = await getData(url);
        const newHtml = users.map(user => {
            const { title, thumbnailUrl } = user;
            return `<tr>
            <td>${title}</td>
            <td><img src="${thumbnailUrl}"></td>
            </tr>`;
        }).reduce((acc, next) => `${acc} ${next}`, '');
        return newHtml;
    }



    document.getElementById('imager').addEventListener('click', async () => {
        const url = 'https://jsonplaceholder.typicode.com/photos';
        const newHtml = await generateHtml(url);
        document.getElementById('table-body').innerHTML = newHtml;
    });

})();