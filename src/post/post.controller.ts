import { Body, Controller, Post, Inject } from '@nestjs/common';
import { PostService } from './post.service';
import { UserPostDto } from './dto/user-post.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService } from '@nestjs/common';
 
@Controller('post')
export class PostController {

    constructor(private postService: PostService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService ) {}

    @Post('/create')
    async Post(@Body() dto: UserPostDto): Promise<UserPostDto> {
        this.logger.log("posting..");
        this.logger.log(dto);
        return dto;
    }
}
