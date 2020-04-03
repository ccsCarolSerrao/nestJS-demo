import { PubSub } from '@google-cloud/pubsub'

export default class ExampleCloudStorageService {
    async publishToTopic() {
        const projectId = 'psyched-era-269322'
        const pubsub = new PubSub({ projectId })

        const topicName = 'example-topic'
        const data = JSON.stringify({ foo: 'bar' })

        const dataBuffer = Buffer.from(data)

        const messageId = await pubsub.topic(topicName).publish(dataBuffer)
        console.log(`Message ${messageId} published.`)
    }
}
