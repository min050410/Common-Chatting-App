import { Param, Get, Body, Controller, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';


// 회원가입 인터페이스 구현

@Controller('users')
export class UsersController {
    constructor( private usersService: UsersService) { }

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
    
    @Get('/:id')
    async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
        return await this.usersService.getUserInfo(userId);
    }

}
