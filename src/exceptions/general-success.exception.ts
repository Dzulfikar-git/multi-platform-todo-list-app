import { HttpException, HttpStatus } from "@nestjs/common";

export class GeneralSuccessException extends HttpException {
    constructor(private data : any = []){
        super('successfully process request', HttpStatus.OK);
    }
}