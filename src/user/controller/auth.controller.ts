import { Body, Controller, Post, Session } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { UsersService } from "../services/users.service";
import { RegisterDto } from "../dtos/register.dto";


@Controller('auth')
export class AuthController{
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) { }
    
    @Post('register')
    async register(
        @Body() { username, email, password }: RegisterDto,
        @Session() session: any
    ) {
        const user = await this.authService.register(username, email, password);

        const { _id, isAdmin } = user;

        const { accessToken } = await this.authService.login(username, user._id);
        
        const loggedUser = {
            username: user.username,
            _id,
            isAdmin,
            email: user.email,
            accessToken,
        };
        session.user = loggedUser;
        return loggedUser;
    }
}