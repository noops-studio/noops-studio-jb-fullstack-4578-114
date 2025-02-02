// const { default: axios } = require("axios");

async function fetchUserNames() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    users.forEach(user => {
        console.log(user.name);
    });
    return users;
}

fetchUserNames();