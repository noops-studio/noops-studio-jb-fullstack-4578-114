"use strict";

(() => {

const getData = async (url) => {
    const response = await fetch(url);
    return await response.json();
}

const generateHtml = async (url) => {
    const users = await getData(url);
    const newHtml = users.map(user => {
        const { name, email } = user;
        return `<li>name: ${name}, email: ${email}</li>`;
    }).reduce((acc, next) => `${acc} ${next}`, '');
    return newHtml;
}



document.getElementById('button').addEventListener('click', async () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const newHtml = await generateHtml(url);
    document.getElementById('users').innerHTML = newHtml;
});

})();