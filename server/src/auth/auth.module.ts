import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import {jwtConstans} from './constants'

@Module({
    imports:[UsersModule,
    JwtModule.register({
        secret:jwtConstans.secret,
        signOptions:{expiresIn:'30s'},
    })
    ],
    controllers:[AuthController],
    providers:[AuthService],
    exports:[AuthService]
})
export class AuthModule{
    
}