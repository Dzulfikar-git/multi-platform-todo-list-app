import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  UseFilters,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserIdParam } from 'src/params/user-id.param';
import { NotFoundExceptionFilter } from 'src/filters/not-found-exception.filter';
import { GeneralSuccessException } from 'src/exceptions/general-success.exception';
import { MongoExceptionFilter } from 'src/filters/mongo-validation-exception.filter';
import { UnprocessableEntityExceptionFilter } from 'src/filters/unprocessable-entity.filter';
import { CastErrorExceptionFilter } from 'src/filters/cast-error-exception.filter';
import { GeneralSuccessExceptionFilter } from 'src/filters/general-success-exception.filter';

@Controller({
  path: 'api/v1/users',
  version: '1',
})
@UseFilters(new MongoExceptionFilter())
@UseFilters(new UnprocessableEntityExceptionFilter())
@UseFilters(new CastErrorExceptionFilter())
@UseFilters(new NotFoundExceptionFilter())
@UseFilters(new GeneralSuccessExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    throw (user == null) ?  new InternalServerErrorException() : new GeneralSuccessException(user);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    throw new GeneralSuccessException(users);
  }

  @Get(':id')
  async findOne(@Param() { id }: UserIdParam) {
    const user = await this.usersService.findOne(id);
    throw (user == null) ?  new NotFoundException() : new GeneralSuccessException(user);
  }

  @Delete(':id')
  async remove(@Param() { id }: UserIdParam) {
    const deletedUser = await this.usersService.remove(id);
    throw (deletedUser == null) ?  new NotFoundException() : new GeneralSuccessException(deletedUser);
  }
}
