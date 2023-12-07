
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
    constructor(private authService: AuthService,
        private usersService: UsersService
    ) { }


    async canActivate(
        context: ExecutionContext,
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const { refresh_token, username } = request.body
        if (!refresh_token) {
            throw new UnauthorizedException('Поле refresh token  обязательно')
        }
        if (!username) {
            throw new UnauthorizedException('Поле "username"  обязательно')

        }

        const user = await this.usersService.findOne(username)

        if(!user){
            throw new UnauthorizedException('Пользователь не найден')

        }
        return true

    }
}
