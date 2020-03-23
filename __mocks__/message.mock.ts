import { random } from 'faker'

import { IMessage } from '../src/utils/messages.util'

export const messageMock: IMessage = {
    code: random.number({ precision: 4 }),
    status: random.number({ min: 200, max: 500 }),
    message: random.words(10),
    result: {
        xpto: random.words(8),
    },
}
