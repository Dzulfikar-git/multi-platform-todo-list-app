import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Error } from 'mongoose'
import ValidationError = Error.ValidationError

@Catch(ValidationError)
export class MongoExceptionFilter<T> implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) : any {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      return response.status(422).json({
        status: 'error',
        code: 422,
        message: 'Validation Error',
        data: exception.errors
      });
  }
}
