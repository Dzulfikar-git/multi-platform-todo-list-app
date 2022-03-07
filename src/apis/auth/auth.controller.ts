import { Body, Controller, Get, InternalServerErrorException, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { GeneralCreatedException } from 'src/exceptions/general-created.exception';
import { GeneralSuccessException } from 'src/exceptions/general-success.exception';
import { CastErrorExceptionFilter } from 'src/filters/cast-error-exception.filter';
import { GeneralCreatedExceptionFilter } from 'src/filters/general-created-exception.filter';
import { GeneralSuccessExceptionFilter } from 'src/filters/general-success-exception.filter';
import { MongoExceptionFilter } from 'src/filters/mongo-validation-exception.filter';
import { NotFoundExceptionFilter } from 'src/filters/not-found-exception.filter';
import { UnprocessableEntityExceptionFilter } from 'src/filters/unprocessable-entity.filter';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard, Public } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
@UseFilters(new MongoExceptionFilter())
@UseFilters(new UnprocessableEntityExceptionFilter())
@UseFilters(new CastErrorExceptionFilter())
@UseFilters(new NotFoundExceptionFilter())
@UseFilters(new GeneralSuccessExceptionFilter())
@UseFilters(new GeneralCreatedExceptionFilter())
export class AuthController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

    @Public()
    @Post('/api/v1/register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        const user = await this.usersService.create(registerUserDto);
        throw (user == null) ?  new InternalServerErrorException() : new GeneralCreatedException(user);
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/api/v1/login')
    async login(@Request() req){
        const user = await this.authService.login(req.user);
        throw new GeneralSuccessException(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/api/v1/profile')
    async getprofile(@Request() req){
        const user = await this.usersService.findOne(req.user.userId);
        throw new GeneralSuccessException(user);
    }
}
