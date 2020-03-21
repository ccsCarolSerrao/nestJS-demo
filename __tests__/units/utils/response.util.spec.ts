import ResponseUtil from '../../../src/utils/response.util'

import { responseMock } from '../../../__mocks__/express/response.mock'
import { messageMock} from '../../../__mocks__/message.mock'

describe('Response Util', () => {
  it('Should returns the same status of message mock', async () => {
    const responseReturn = ResponseUtil.handle(responseMock(), messageMock)

    expect(responseReturn.status).toHaveBeenCalledWith(messageMock.status)
  })

  it('Should returns a IMessage structure and content', async () => {
    const responseReturn = ResponseUtil.handle(responseMock(), messageMock)

    expect(responseReturn.json).toHaveBeenCalledWith(messageMock)
  })
})
