import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
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
            message: exception.message,
            data: []
        });
    }
} 