const handle = (data: any, _context: any) => {
    const pubSubMessage = data
    const name = pubSubMessage.data ? Buffer.from(pubSubMessage.data, 'base64').toString() : 'World'

    console.log(`Hello, ${name}!`)
}

export const examplePubSub = handle
