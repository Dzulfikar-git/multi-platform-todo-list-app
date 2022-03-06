import { ArgumentsHost, Catch, ExceptionFilter, UnprocessableEntityException } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(UnprocessableEntityException)
export class UnprocessableEntityExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();


        response
        .status(422)
        .json({
            status: 'error',
            code: status,
            message: 'Failed Validation',
            data: exception.response
        });
    }
} 