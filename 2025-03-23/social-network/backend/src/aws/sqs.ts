import { SQSClient, CreateQueueCommand } from "@aws-sdk/client-sqs";
import config from "config";

// Deep clone the SQS connection config
const sqsConfig = JSON.parse(JSON.stringify(config.get("sqs.connection")));

// If we're not running against Localstack, remove the endpoint property
if (!config.get<boolean>("sqs.isLocalstack")) {
  delete sqsConfig.endpoint;
}

// Initialize the SQS client
const sqsClient = new SQSClient(sqsConfig);

// Get the default queue name from config
const defaultQueueName: string = config.get("sqs.queue");

/**
 * Helper function to create a queue if it does not already exist.
 * @param queueName - The name of the SQS queue to create (defaults to the configured queue name).
 */
export async function createQueueIfNotExist(queueName: string = defaultQueueName) {
  try {
    await sqsClient.send(new CreateQueueCommand({ QueueName: queueName }));
    console.log(`Queue "${queueName}" created or already exists.`);
  } catch (e) {
    console.error("Error creating the queue:", e);
  }
}

export default sqsClient;
