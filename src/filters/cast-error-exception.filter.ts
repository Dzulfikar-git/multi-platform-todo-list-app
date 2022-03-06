import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Error } from 'mongoose'
import CastError = Error.CastError


@Catch(CastError)
export class CastErrorExceptionFilter<T> implements ExceptionFilter {
  catch(exception: CastError, host: ArgumentsHost) : any {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      return response.status(422).json({
        status: 'error',
        code: 422,
        message: 'Invalid Format Id',
        data: []
      });
  }
}
