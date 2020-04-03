import { PubSub } from '@google-cloud/pubsub'

const publishToTopic = async () => {
    const projectId = 'psyched-era-269322'
    const pubsub = new PubSub({ projectId })

    const topicName = 'example-topic'
    const data = JSON.stringify({ foo: 'bar' })

    const dataBuffer = Buffer.from(data)

    const messageId = await pubsub.topic(topicName).publish(dataBuffer)
    console.log(`Message ${messageId} published.`)
}

const handle = async (data: any, _context: any) => {
    const file = data
    if (file.resourceState === 'not_exists') {
        console.log(`File ${file.name} deleted.`)
    } else if (file.metageneration === '1') {
        await publishToTopic()
        console.log(`File ${file.name} uploaded.`)
    } else {
        await publishToTopic()
        console.log(`File ${file.name} metadata updated.`)
    }
}

export const exampleCloudStorage = handle
