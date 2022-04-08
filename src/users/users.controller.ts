import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserInfo } from './UserInfo';

// 회원가입 인터페이스 구현

@Controller('users')
export class UsersController {

    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<void> {
        console.log(dto);
    }

    @Post('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
        console.log(dto);
        return;
    }

    @Post('/login')
    async login(@Body() dto: UserLoginDto): Promise<string> {
        console.log(dto);
        return;
    }

    // getter
    @Get('/:id')
    async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
        console.log(userId);
        return;
    }

}
