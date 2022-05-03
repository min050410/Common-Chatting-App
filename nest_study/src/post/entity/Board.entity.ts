import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity('board')
export class BoardEntity {
    
    // 자동으로 1씩 증가하는 값
    @PrimaryGeneratedColumn()
    id: number;

    // 외래 키
    user_id: string;

    @Column({length: 20})
    title: string;
    @Column({length: 1000})
    content: string;

    @CreateDateColumn({
        name: "created_at"
    })
    createdDate: Date;

}