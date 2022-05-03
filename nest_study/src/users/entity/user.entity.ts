import { Column, Entity, PrimaryColumn } from 'typeorm';

// mysql 서버에서 생성된 스키마와 일치하도록 소문자여야 함
@Entity('user')
export class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column({ length: 30 })
    name: string;

    @Column({ length: 60 })
    email: string;

    @Column({ length: 30 })
    password: string;

    @Column({ length: 60 })
    signupVerifyToken: string;
}