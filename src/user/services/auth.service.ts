import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { encryptPassword } from "src/utils";



@Injectable()
export class AuthService{ 
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOne(email);
        if (!user) throw new NotFoundException('Invalid email or password');

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) throw new BadRequestException('Invalid Email or password');
        return user;
    }

    async login(username: string, userId: string) { 
        const payload = { username, sub: userId };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async register(username: string, email: string, password: string) {
        const existingUser = await this.userService.findOne(email);

        if (existingUser) throw new BadRequestException('Email is already registered');

        const encryptedPassword = await encryptPassword(password);

        const user = await this.userService.create({
            email,
            password: encryptedPassword,
            isAdmin: false,
            username,
        });
        return user;
    }
    
     
}