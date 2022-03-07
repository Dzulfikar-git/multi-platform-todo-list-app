import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import { Request, Response } from "express";
import { GeneralCreatedException } from "src/exceptions/general-created.exception";

@Catch(GeneralCreatedException)
export class GeneralCreatedExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
        .status(status)
        .json({
            status: 'ok',
            code: status,
            message: exception.message,
            data: exception.data
        });
    }
} 