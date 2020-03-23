import { random, internet, name } from 'faker'
import moment from 'moment'

import ExampleApiCreateDto from '../src/example-api/v1/dtos/example-api-create.dto'
import ExampleApiUpdateDto from '../src/example-api/v1/dtos/example-api-update.dto'

export const exampleApiCreateMock = () => {
    return {
        id: random.uuid(),
        name: name.findName(),
        email: internet.email(),
        date: moment(moment().format('YYYY-MM-DD'))
            .add(1, 'month')
            .toDate(),
        number: random.number({ min: 0 }),
        value: random.number({ max: 100 }),
    } as ExampleApiCreateDto
}

export const exampleApiUpdateMock = () => {
    return {
        name: name.findName(),
        email: internet.email(),
        date: moment(moment().format('YYYY-MM-DD'))
            .add(2, 'month')
            .toDate(),
        number: random.number({ min: 0 }),
        value: random.number({ max: 100 }),
    } as ExampleApiUpdateDto
}
