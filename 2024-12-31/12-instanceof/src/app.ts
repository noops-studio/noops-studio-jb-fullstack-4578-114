import { axios } from 'axios';
async function printUsers() {
    const users = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log(users.data);
}
printUsers();