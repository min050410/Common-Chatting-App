import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './entity/Board.entity';
import { Repository, Connection } from 'typeorm';
import { ulid } from 'ulid';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService } from '@nestjs/common';

@Injectable()
export class PostService {
    constructor(@InjectRepository(BoardEntity) private boardRepository: Repository<BoardEntity>,
        private connection: Connection,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) { }

    async createPost(title: string, content: string) {
        this.logger.log(`'${title}' 글을 db에 추가합니다.`);
        await this.savePostUsingTransaction(title, content);
    }

    private async savePostUsingTransaction(title: string, content: string) {
        await this.connection.transaction(async manager => {
            const post = new BoardEntity();
            // todo :: 랜덤 ulid 변경
            post.user_id = ulid();
            post.title = title;
            post.content = content;
            await manager.save(post);
            this.logger.log('추가완료되었습니다.');
        })
    }
}
