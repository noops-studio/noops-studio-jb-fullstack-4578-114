const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const num1 = Number(parsedUrl.query.num1);
    const num2 = Number(parsedUrl.query.num2);

    let smallernumber;
    if (!isNaN(num1) && !isNaN(num2)) {
        smallernumber = Math.min(num1, num2);
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/javascript');
    res.end(`alert('The smaller number is: ${smallerNumber}');`);
    res.end("alert('Invalid input. Please provide two numbers in the URL like this: http://127.0.0.1:3000?num1=5&num2=10');");
});

const port = 3000;
const hostname = '127.0.0.1';

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});