import { IsEmail, IsString, Max, Min, MinLength, Validate } from "class-validator";

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
