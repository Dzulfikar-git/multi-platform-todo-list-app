import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Schema } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findAll() : Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string) : Promise<User> {
    return await this.userModel.findById({ _id: id }).exec();
  }

  async findByEmail(email: string) : Promise<User> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) : Promise<User> {
    return await this.userModel.findByIdAndUpdate({ _id: id }, updateUserDto).exec();
  }

  async remove(id: string) : Promise<User> {
    return await this.userModel.findByIdAndDelete({_id: id}).exec();
  }
}
