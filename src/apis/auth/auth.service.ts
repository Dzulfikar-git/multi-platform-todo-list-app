import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(email: string, password: string) : Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if(user){
            const matchPass = await bcrypt.compare(password, user.password);
            if(matchPass){
                return user
            }
        }
        return null;
    }

    async login(user: any){
        const payload = { email: user.email, sub: user._id };
        return {
            user: user._doc,
            access_token: this.jwtService.sign(payload)
        }
    }
}