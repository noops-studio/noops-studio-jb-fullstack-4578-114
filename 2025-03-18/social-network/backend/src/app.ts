import express from "express";
import config from 'config';
import sequelize from "./db/sequelize";
import errorLogger from "./middlewares/error/error-logger";
import errorResponder from "./middlewares/error/error-responder";
import notFound from "./middlewares/not-found";
import router from "./routers/index";
import cors from 'cors';
import fileUpload from "express-fileupload";
const port = config.get<string>('app.port');
const name = config.get<string>('app.name');
const force = config.get<boolean>('sequelize.sync.force');

const app = express(); 
app.use(cors())
// Middlewares
// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));

app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

(async () => {
    await sequelize.sync({ force });

    app.use((req, res, next) => {
        console.log(`Method: ${req.method}  Request URL: ${req.originalUrl}`);
        next(); // Move to the next middleware
    });
    // Use the main router
    app.use('/api', router);

    // Error handling
    app.use(notFound);
    app.use(errorLogger);
    app.use(errorResponder);

    app.listen(port, () => console.log(`${name} started on port ${port}...`));
})();