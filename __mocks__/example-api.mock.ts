import { random, internet, name } from 'faker'
import moment from 'moment'

import IExampleApi from '../src/example-api/v1/example-api.interface'

 export const exampleApiMock: IExampleApi = {
    id: random.uuid(),
    name: name.findName(),
    email: internet.email(),
    date: moment().add(1, 'days').toDate(),
    number: random.number({ min: 0 }),
    value: random.number({ max: 100 })
}