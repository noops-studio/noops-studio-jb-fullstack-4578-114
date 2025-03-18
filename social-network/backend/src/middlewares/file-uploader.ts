// middlewares/file-uploader.ts
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { v4 } from "uuid";
import path from "path";
import config from "config";
import { s3Uploader } from "../aws/aws";

declare global {
  namespace Express {
    interface Request {
      imageUrls?: string[];
    }
  }
}

export default async function fileUploader(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Check if files were uploaded under the key "postImages"
  if (!req.files || !req.files.postImages) {
    console.error("No files uploaded.");
    return next();
  }

  // Normalize to an array (it could be a single file object)
  const files = req.files.postImages;
  const filesArray = Array.isArray(files) ? files : [files];

  try {
    // Upload all files concurrently
    const uploadPromises = filesArray.map((file: UploadedFile) => {
      const key = `${v4()}${path.extname(file.name)}`;
      return s3Uploader(key, file.data);
    });
    const results = await Promise.all(uploadPromises);
    // Store all uploaded file URLs in the request
    req.imageUrls = results.map((result) => result.Location);
    console.log("Uploaded files to S3:", req.imageUrls);
    next();
  } catch (error) {
    console.error("Error uploading to S3:", error);
    next(error);
  }
}
