import { ReceiveMessageCommand ,SQSClient } from "@aws-sdk/client-sqs";
import config from 'config';
const sqsConfig = JSON.parse(JSON.stringify(config.get('sqs.connection')));

if(!config.get<boolean>('sqs.isLocalStack')) delete sqsConfig.endpoint;

const sqsClient = new SQSClient(sqsConfig);

 async function work() {

    const { Messages } = await sqsClient.send(new ReceiveMessageCommand({
        QueueUrl: config.get('sqs.queueUrl'),
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 1
    }));

        console.log(Messages);
if(Messages) {
        const {Body, ReceiptHandle} = Messages[0];
        console.log(Body);
        console.log(ReceiptHandle);
}
}
work();