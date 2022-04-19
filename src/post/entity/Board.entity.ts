import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('board')
export class BoardEntity {

    @PrimaryColumn()
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