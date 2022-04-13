import { Param, Get, Body, Controller, Post, Query, Headers } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService,
                private authService: AuthService) { }

    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<void> {
        const { name, email, password } = dto;
        await this.usersService.createUser(name, email, password);
        console.log(dto);
    }

    @Post('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
        const { signupVerifyToken } = dto;

        return await this.usersService.verifyEmail(signupVerifyToken);
    }

    @Post('/login')
    async login(@Body() dto: UserLoginDto): Promise<string> {
        const { email, password } = dto;
        
        return await this.usersService.login(email, password);
    }
    
    @Get('/youngmin')
    async getUserInfo(@Headers() headers: any): Promise<UserInfo> {
        // 헤더에서 jwt 파싱
        const jwtString = headers.authorization.split('Bearer ')[1];

        // this.authService.verify(jwtString);

        // jwt verify로 userId 구하고, db에서 찾기
        return await this.usersService.getUserInfo(this.authService.verify(jwtString).userId);
    }

}
