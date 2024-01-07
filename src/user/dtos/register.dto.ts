import {
    IsEmail,
    IsString,
    // IsStrongPassword,
    MaxLength,
    MinLength
} from "class-validator";

export class RegisterDto{
    @IsString()
    @MinLength(4, { message: 'username too short.' })
    @MaxLength(20, { message: 'username too long.' })
    username: string;

    @IsEmail({}, { message: 'Email is not valid.' })
    email: string;
    
    @IsString()
    @MinLength(7, { message: 'Password too short.' })
    @MaxLength(20, { message: 'Password to long' })
        // Use only in production not test.
    // @IsStrongPassword({},{ message: 'Password is not strong enough.' })    
    password: string;
}