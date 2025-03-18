import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 } from "uuid";
import path from 'path';
import config from 'config';
import _ from 'lodash';
const s3Config = _.cloneDeep(config.get('s3.connection'));

export const s3Client = new S3Client(s3Config);

export const bucketCreator = async () => {
                try {
                    await s3Client.send(new CreateBucketCommand({ Bucket: 'test' }));
                } catch (error) {
                    console.log('Bucket already exists');
                }
}

export const s3Uploader = async (key ,body) => {
                const upload = new Upload({
                    client: s3Client,
                    params: {
                        Bucket: config.get('s3.bucket'),
                        Key: key, // Fix filename extension handling
                        Body: body
                    }
                });
                const result = await upload.done()
                return result
}