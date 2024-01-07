import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthController } from './controller/auth.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

 @Module({
  imports: [ 
    
    MongooseModule.forFeature([
      {
        name: User.name,
        schema:UserSchema,
    },
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions:{expiresIn:'1d'},
    }),
  ],
  controllers: [AuthController],
  providers: [
    UsersService,
    AuthService
  ],
})
export class UserModule {}
