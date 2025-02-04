import express from 'express';
import axios from 'axios';
const app = express();

const PORT = 3000;

function getUser(req: express.Request, res: express.Response) {
const result = axios.get('https://jsonplaceholder.typicode.com/users');
return result;
}

app.use('/users', async (req, res) => {
const result = await getUser(req, res);
res.send(result.data);
});

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});