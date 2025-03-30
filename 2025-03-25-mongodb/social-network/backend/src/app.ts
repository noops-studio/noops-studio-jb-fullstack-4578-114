import express from "express";
import config from "config";
import cors from "cors";
import fileUpload from "express-fileupload";
import router from "./routers/index";
import { connectDB } from "./db/mongoose";
import errorLogger from "./middlewares/error/error-logger";
import errorResponder from "./middlewares/error/error-responder";
import notFound from "./middlewares/not-found";
import { createAppBucketIfNotExist } from "./aws/aws";
import { createQueueIfNotExist } from "./aws/sqs";

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

// Mount your main API router
app.use("/api", router);

// Error handling middleware
app.use(notFound);
app.use(errorLogger);
app.use(errorResponder);

export async function start() {
  await connectDB();
  await createAppBucketIfNotExist();
  await createQueueIfNotExist();
}

export default app;
