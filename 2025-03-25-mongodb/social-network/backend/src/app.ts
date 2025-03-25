import express from "express";
import config from "config";
import sequelize from "./db/sequelize";
import errorLogger from "./middlewares/error/error-logger";
import errorResponder from "./middlewares/error/error-responder";
import notFound from "./middlewares/not-found";
import router from "./routers/index";
import cors from "cors";
import fileUpload from "express-fileupload";
import { createAppBucketIfNotExist } from "./aws/aws";
import { createQueueIfNotExist } from "./aws/sqs";
const force = config.get<boolean>('sequelize.sync.force');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

// Use the main router
app.use("/api", router);

// Error handling
app.use(notFound);
app.use(errorLogger);
app.use(errorResponder);

// Function to start the app (Used in `server.ts`)
export async function start() {
  await sequelize.sync({ force });
  await createAppBucketIfNotExist();
  await createQueueIfNotExist();
}



// Export app for testing
export default app;
