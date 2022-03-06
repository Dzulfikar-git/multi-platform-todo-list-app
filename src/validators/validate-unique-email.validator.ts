import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsersService } from "src/apis/users/users.service";


@ValidatorConstraint({ name: 'ValidateUniqueEmail', async: true })
@Injectable()
export class ValidateUniqueEmail implements ValidatorConstraintInterface {
    constructor(private readonly usersService: UsersService) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        try {
            const user = await this.usersService.findByEmail(value);
            return (user == null) ? true : false
        } catch (error) {
            return (value == undefined) ? true : false;
        }
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `email already exists`;
    }
}