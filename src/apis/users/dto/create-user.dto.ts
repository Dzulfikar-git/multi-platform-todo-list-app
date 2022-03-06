import { IsEmail, IsString, Max, Min, MinLength, Validate } from "class-validator";
import { ValidateUniqueEmail } from "src/validators/validate-unique-email.validator";

export class CreateUserDto {
  @IsEmail()
  @Validate(ValidateUniqueEmail)
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(8)
  password: string;
}
