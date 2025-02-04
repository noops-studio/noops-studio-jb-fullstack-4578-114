const express = require('express');
const app = express();

const Port = 3000;

const user = {
    name: "Yuval",
    email: "yuval@gmail.com",
    age: 23,
};

const users = [
    {
        name: "Yuval",
        email: "yuval@gmail.com",
        age: 23,
    },
    {
        name: "Yuval",
        email: "yuval@gmail.com",
        age: 23,
    },
    {
        name: "Yuval",
        email: "yuval@gmail.com",
        age: 23,
    }
];

function logRequest(req, res, next) {
    console.log('Request URL:', req.url);
    next();
}

function connectToMysql(req, res, next) {
    console.log('Connected to Mysql');
    next();
}

function connectToMongo(req, res, next) {
    console.log('Connected to Mongo');
    next();
}

function sendUser(req, res) {
    connectToMysql(req, res, () => {}); // Calls the function but does not pass to next()
    res.setHeader("Content-Type", "application/json");
    res.json(user); // Use res.json() instead of res.write() + next()
}

function sendList(req, res) {
    res.setHeader("Content-Type", "text/plain");
    res.write("name,email,age\n");
    users.forEach((user) => {
        res.write(`${user.name},${user.email},${user.age}\n`);
    });
    res.end();
}
app.use(logRequest);

app.get('/user', sendUser); // Use `app.get()` instead of `app.use()`
app.use('/list', sendList);

app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
});
