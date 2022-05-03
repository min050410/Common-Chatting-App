import { Param, Get, Body, Controller, Post, Query, Headers, UseGuards, Inject, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth.guard';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) { }

    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<void> {
        this.printLoggerServiceLog(dto);
        const { name, email, password } = dto;
        await this.usersService.createUser(name, email, password);
        this.logger.log('사용자가 생성되었습니다...\n' + dto);
    }

    @Post('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
        const { signupVerifyToken } = dto;

        return await this.usersService.verifyEmail(signupVerifyToken);
    }

    @Post('/login')
    async login(@Body() dto: UserLoginDto): Promise<string> {
        const { email, password } = dto;
        
        this.logger.log(this.usersService.getName(email, password) + '이 로그인 하였습니다.');
        return await this.usersService.login(email, password);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getUserInfo(@Headers() headers: any, @Param('id') userId: string): Promise<UserInfo> {
        return await this.usersService.getUserInfo(userId);
    }

    private printLoggerServiceLog(dto: any) {
        try {
            throw new InternalServerErrorException('test');
        } catch (e) {
            this.logger.error('errer: ' + JSON.stringify(dto), e.stack);
        }
        this.logger.warn('warn: ' + JSON.stringify(dto));
        this.logger.log('log: ' + JSON.stringify(dto));
        this.logger.verbose('verbose: ' + JSON.stringify(dto));
        this.logger.debug('debug: ' + JSON.stringify(dto));
    }
}
