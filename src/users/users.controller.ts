import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
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
}
