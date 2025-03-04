import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
declare global {
    namespace Express {
        interface Request {
            imageUrl?: string;
        }}}
export default async function fileUploader(req: Request, res: Response, next: NextFunction) {
    if (!req.files) {
        return next();
    }

    const s3Client = new S3Client({
        region: 'us-east-1',
        forcePathStyle: true,
        credentials: {
            accessKeyId: 'test',
            secretAccessKey: 'test'
        },
        endpoint: 'http://localhost:4566'
    });
    const postImage = req.files.postImage as UploadedFile;

    // const createBucket = await s3Client.send(new CreateBucketCommand({ Bucket: 'test' }));


    try {
        await s3Client.send(new CreateBucketCommand({ Bucket: 'test' }));
    } catch (error) {
        console.log('Bucket already exists');
        
    }


    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: 'test',
            Key: postImage.name,
            Body: postImage.data
        }
    });

    const result = await upload.done();
    const file = req.files.postImage;
    const url = 'http://localhost:3000/';

    // req.imageUrl = url + file.name;
    req.imageUrl = result.Location;
    next();
}