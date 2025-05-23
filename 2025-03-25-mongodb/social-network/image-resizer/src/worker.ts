import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { DeleteMessageCommand, ReceiveMessageCommand, SQSClient } from '@aws-sdk/client-sqs'
import { Upload } from '@aws-sdk/lib-storage'
import config from 'config'
import sharp from 'sharp'

const sqsConfig = JSON.parse(JSON.stringify(config.get('sqs.connection')))
const s3Config = JSON.parse(JSON.stringify(config.get('s3.connection')))

if (!config.get<boolean>('sqs.isLocalstack')) delete sqsConfig.endpoint
if (!config.get<boolean>('s3.isLocalstack')) delete s3Config.endpoint

const sqsClient = new SQSClient(sqsConfig)
const s3Client = new S3Client(s3Config)

async function work() {
    // while(true) {
        const { Messages } = await sqsClient.send(new ReceiveMessageCommand({
            QueueUrl: config.get<string>('sqs.queueUrl'),
            MaxNumberOfMessages: 1
        }))
        console.log(Messages)
        if (Messages) {
            const { Body, ReceiptHandle } = Messages[0]

            const message = JSON.parse(Body!)

            console.log(message)

            const s3Response = await s3Client.send(new GetObjectCommand({
                Bucket: message.bucket,
                Key: message.key
            }))

            console.log(s3Response)

            const photoContent = await s3Response.Body?.transformToByteArray()

            console.log(photoContent)


            const metadata = await sharp(photoContent).metadata()
            const { width, height } = metadata

            const resizedImage = await sharp(photoContent)
                .resize(Math.floor(width! * 0.1), Math.floor(height! * 0.1))
                .toBuffer()

            const resizedKey = message.key.replace('.', '-10.')
            // ghgdfhgjdfhgjhdfjkghdfj.png
            // ghgdfhgjdfhgjhdfjkghdfj-10.png

            const upload = new Upload({
                client: s3Client,
                params: {
                    Bucket: message.bucket,
                    Key: resizedKey,
                    Body: resizedImage,
                    ContentType: s3Response.ContentType
                }
            })                

            const newUploadResponse = await upload.done()
            console.log(newUploadResponse)

            // await sqsClient.send(new DeleteMessageCommand({
            //     QueueUrl: config.get<string>('sqs.queueUrl'),
            //     ReceiptHandle,
            // }))            

        } else {
            console.log('nothing to process....')
        }


    // }
}

work()
