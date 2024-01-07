import { Module } from "@nestjs/common";
import { appController } from "./controllers/app.controller";
import { AppService } from "./services/app.services";
import { ConfigModule, ConfigService} from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { connectDB } from "src/utils/config";
import { UserModule } from "src/user/user.module";
import { CommandModule } from "nestjs-command";

@Module({
    imports: [
        ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: ['.env']
    }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: connectDB,
        }),
        CommandModule,
        UserModule,
    ],
    controllers: [appController],
    providers: [AppService],
})

export class AppModule { }