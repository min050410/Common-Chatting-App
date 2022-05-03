import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { BoardEntity } from './entity/Board.entity';

@Module({
  imports: [
    // 현재 범위에 등록할 레포지토리 정의
    TypeOrmModule.forFeature([BoardEntity]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
