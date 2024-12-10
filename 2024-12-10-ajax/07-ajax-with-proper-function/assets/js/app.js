"use strict";

(() => {
    document.getElementById('button').addEventListener('click', async () => {
        const url = 'https://jsonplaceholder.typicode.com/users';
        
        const response = await fetch(url);
        const users = await response.json();
        console.log(users);

        const newHtml = users.map(user => {
            const { name, email } = user;
            return `<li>name: ${name}, email: ${email}</li>`;
        }).reduce((acc, next) => `${acc} ${next}`, '');

        document.getElementById('users').innerHTML = newHtml;
    });
})();