const { default: axios } = require("axios");

async function fetchUserNames() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data;
    users.forEach(user => {
        console.log(user.name);
    });
    return users;
}

fetchUserNames();