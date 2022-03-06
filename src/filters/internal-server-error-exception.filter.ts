import { ArgumentsHost, Catch, ExceptionFilter, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(InternalServerErrorException)
export class InternalServerErrorExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
        .status(status)
        .json({
            status: 'error',
            code: status,
            message: 'internal server error',
            data: []
        });
    }
} 