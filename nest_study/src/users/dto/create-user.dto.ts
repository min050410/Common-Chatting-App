import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { NotIn } from 'src/utils/decorators/not-in';

// readonly : read only
export class CreateUserDto {
    // 공백 제거 로직
    @Transform(params => params.value.trim())
    @NotIn('password', { message: 'password는 name과 같은 문자열을 포함할 수 없습니다.' })
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    readonly name: string;

    @IsString()
    @IsEmail()
    @MaxLength(30)
    readonly email: string;

    @IsString()
    @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
    readonly password: string;
}