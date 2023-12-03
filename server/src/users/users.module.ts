import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { User, UserSchema } from 'src/schemas/users.schema';
import { UsersService } from './users.service';


@Module({
    imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
    exports:[UsersService],
    providers:[UsersService]

})
export class UsersModule {

    
}
