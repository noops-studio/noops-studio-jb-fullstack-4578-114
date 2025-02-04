const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');

const app = express();
const port = 3000;

// Fetch users from the API
async function fetchUsers() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

// Convert JSON data to XML
function convertToXml(data) {
    const builder = new xml2js.Builder();
    return builder.buildObject({ users: data });
}

// Filter users based on search query
async function filterUsers(search, format) {
    const users = await fetchUsers();
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));

    if (format === 'json') {
        return filteredUsers;
    } else if (format === 'xml') {
        return convertToXml(filteredUsers);
    } else {
        return { error: 'Invalid format' };
    }
}

// Middleware to log requests
function logRequest(req, res, next) {
    console.log('Request URL:', req.url);
    next();
}

app.use(logRequest);

// Route to fetch filtered users
app.get('/user', async (req, res) => {
    const search = req.query.search || '';
    const format = req.query.format || 'json';

    const data = await filterUsers(search, format);
    if (format === 'json') {
        res.json(data);
    } else if (format === 'xml') {
        res.set('Content-Type', 'application/xml');
        res.send(data);
    } else {
        res.status(400).json({ error: 'Invalid format' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
