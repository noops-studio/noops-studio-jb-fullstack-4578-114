import { Upload } from "@aws-sdk/lib-storage";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 } from "uuid";
import config from "config";
import s3Client from "../aws/aws";
import sqsClient from "../aws/sqs";
import { GetQueueUrlCommand, SendMessageCommand } from "@aws-sdk/client-sqs";

declare global {
  namespace Express {
    interface Request {
      imageUrl?: string;
    }
  }
}

export default async function fileUploader(req: Request, res: Response, next: NextFunction) {
  if (!req.files) return next();

  // Note: change from req.files.postImage to req.files.postImages if using that key.
  const postImage = req.files.postImages as UploadedFile;

  // Generate a unique key for the image
  const key = `${v4()}${path.extname(postImage.name)}`;
  const bucket = config.get<string>("s3.bucket");

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: bucket,
      Key: key,
      Body: postImage.data,
      ContentType: postImage.mimetype,
    },
  });

  const response = await upload.done();
  req.imageUrl = response.Location;

  // After a successful upload, send a message to SQS with bucket and key details.
  try {
    const defaultQueueName: string = config.get("sqs.queue");
    const getQueueUrlResult = await sqsClient.send(new GetQueueUrlCommand({ QueueName: defaultQueueName }));
    const queueUrl = getQueueUrlResult.QueueUrl;
    if (!queueUrl) {
      throw new Error("Queue URL not found");
    }
    const messageBody = JSON.stringify({
      bucket,
      key,
    });
    await sqsClient.send(new SendMessageCommand({
      QueueUrl: queueUrl,
      MessageBody: messageBody,
    }));
    console.log("Sent message to SQS:", messageBody);
  } catch (e) {
    console.error("Error sending message to SQS:", e);
  }

  next();
}
