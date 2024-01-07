import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose";

export const connectDB = (
    configService: ConfigService
): MongooseModuleOptions => {
    //const dbPassword = configService.get<string>('MONGODB_PASSWORD');
    //const dbName = configService.get<string>('MONGODB_DATABASE_NAME'); 

    const mongodbUri = 'mongodb://localhost:27017/swasthya-med_nestjs';

    return {
        uri: mongodbUri,
        autoIndex: false,
    }
}