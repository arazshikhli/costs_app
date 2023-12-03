import {Body, 
   Controller,
   HttpStatus,
   Post,
   Res, 
   UseGuards} from '@nestjs/common'
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { RegistrationGuard } from './guards/registration.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginGuard } from './guards/login.guard';
import { AuthService } from './auth.service';


@Controller('auth')

export class AuthController{
   constructor (private usersService:UsersService,
      private authService:AuthService
      ){

   } 

   
   @UseGuards(LoginGuard)
   @Post('login')
   async login(@Body()
    loginUserDto:LoginUserDto,@Res() res:Response){
      const user=await this.usersService.login(loginUserDto)
      const access=await this.authService.generateAccessToken(user)
      const refresh = await this.authService.generateRefreshToken(
         user._id as string,
       );
      res.statusCode=HttpStatus.OK;
      return res.send({
         ...access,...refresh,
         username:user.username,
         message:'Авторизация прошла успешно'
      })
   }
   
   @UseGuards(RegistrationGuard)
   @Post('registration')
   async registration(@Body() createUserDto:CreateUserDto,
   @Res() res:Response
   ){
    await this.usersService.registration(createUserDto)
    res.statusCode=HttpStatus.CREATED;
    return res.send('user created')
   }

}