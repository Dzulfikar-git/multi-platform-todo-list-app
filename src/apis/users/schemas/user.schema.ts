import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isEmail } from 'class-validator';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User {
  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
  })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
    minlength: 8
  })
  password: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
    validate: [isEmail, 'invalid email format']
  })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
