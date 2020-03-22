import 'reflect-metadata'
import { HttpStatus } from '@nestjs/common'

export interface IMessage {
  code: number
  status: HttpStatus
  message: string
  result?: any
}

export default class MessageUtil {
  static commons = {
    error: {
      notFound: {
        code: 1001,
        status: HttpStatus.NOT_FOUND,
        message: 'Resource not found - The specified Resource does not exist',
      },
      serverError: {
        code: 1002,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error - Request could not be carried out.',
      },
      invalidQueryParameter: {
        code: 1003,
        status: HttpStatus.BAD_REQUEST,
        message:
          'Invalid Query Parameter - One of the query parameters specified is invalid',
      },
      missingBody: {
        code: 1004,
        status: HttpStatus.BAD_REQUEST,
        message: 'Missing Body - Missing Data in Request Body.',
      },
      validationError: {
        code: 1006,
        status: HttpStatus.NOT_FOUND,
        message: 'Fields Validations Error',
      },
      sintaxeError: {
        code: 1007,
        status: HttpStatus.NOT_FOUND,
        message: 'Sintaxe Error',
      },
    },
    info: {
      healthCheck: {
        code: 1008,
        status: HttpStatus.OK,
        message: 'This function is healthy and is waiting for requests.',
        result: '(-.-)Zzz...',
      },
    },
  }

  static example = {
    info: {
      create: {
        code: 100,
        status: HttpStatus.CREATED,
        message: 'Example was created',
      } as IMessage,
      findAll: {
        code: 101,
        status: HttpStatus.OK,
        message: 'All examples were found',
      } as IMessage,
      findOne: {
        code: 102,
        status: HttpStatus.OK,
        message: 'Example was found',
      } as IMessage,
      update: {
        code: 103,
        status: HttpStatus.OK,
        message: 'Example was updated',
      } as IMessage,
      delete: {
        code: 104,
        status: HttpStatus.OK,
        message: 'Example was deletd',
      } as IMessage,
    },
    error: {
      notFound: {
        code: 151,
        status: HttpStatus.NOT_FOUND,
        message: 'Example was not found',
      } as IMessage,
    }
  }

  static authentication = {
    error: {
      authorizationHeader: {
        code: 1101,
        status: HttpStatus.UNAUTHORIZED,
        message: 'Missing authorization header.',
      },
      loginInvalid: {
        code: 1102,
        status: HttpStatus.UNAUTHORIZED,
        message: 'Username or password is invalid.',
      },
      tokenInvalid: {
        code: 1103,
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid authorization token.',
      },
      userActionNotAllowed: {
        code: 1104,
        status: HttpStatus.METHOD_NOT_ALLOWED,
        message: 'Not Allowed - User action not allowed.',
      },
      tokenMissing: {
        code: 1105,
        status: HttpStatus.UNAUTHORIZED,
        message: 'Token is missing.',
      },
    },
    info: {},
  }

  static token = {
    error: {
      tokenInvalid: {
        code: 1201,
        status: HttpStatus.UNAUTHORIZED,
        message: 'Token is invalid.',
      },
      tokenGenerate: {
        code: 1203,
        status: HttpStatus.UNAUTHORIZED,
        message: 'User is not allowed to generate token.',
      },
    },
    info: {
      code: 1204,
      status: HttpStatus.CREATED,
      message: 'Token was created.',
    },
  }
}
