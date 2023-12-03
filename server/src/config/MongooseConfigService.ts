import { Injectable } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory{
    
    
    createMongooseOptions(): MongooseModuleOptions {
        return {

            uri:process.env.SERVER_URL,
            dbName:process.env.DATABASE_NAME,
            // uri:'mongodb+srv://admin:admin123@cluster0.zra4flb.mongodb.net/?retryWrites=true&w=majority',
            // dbName:'Costs',
        }
        
    }
}