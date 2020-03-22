import { random, internet, name } from 'faker'
import moment from 'moment'

import ExampleApi from '../src/example-api/v1/interfaces/example-api.interface'
import ExampleApiDto from '../src/example-api/v1/dtos/example-api.dto'

export const exampleApiMock: ExampleApi = new ExampleApiDto({
  id: random.uuid(),
  name: name.findName(),
  email: internet.email(),
  date: moment()
    .add(1, 'days')
    .toDate(),
  number: random.number({ min: 0 }),
  value: random.number({ max: 100 }),
})
