import { HttpException, HttpStatus } from "@nestjs/common";

export class GeneralCreatedException extends HttpException {
    constructor(private data : any = []){
        super('successfully process request', HttpStatus.CREATED);
    }
}