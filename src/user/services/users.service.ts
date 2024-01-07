import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "../schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    
    async create(user: Partial<UserDocument>): Promise < UserDocument > {
            const createdUser = await this.userModel.create(user);
            return createdUser;
    }
    
    async findOne(email: string): Promise<UserDocument> { 
        const user = await this.userModel.findOne({ email });

        return user;
    }
    
}