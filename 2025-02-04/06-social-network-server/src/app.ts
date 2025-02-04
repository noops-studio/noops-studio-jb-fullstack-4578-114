import  express from "express";
import config from "config";
const app = express();
// const PORT = process.env.PORT || 3000;
const PORT = config.get<number>("app.port");

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});