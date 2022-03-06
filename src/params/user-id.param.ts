import { IsAlpha, IsMongoId, IsNumber, Validate } from "class-validator";
import mongoose from "mongoose";
import { Schema } from 'mongoose';

export class UserIdParam {
    @IsMongoId()
    id: string
}