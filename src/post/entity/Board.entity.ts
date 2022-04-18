import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity('board')
export class Board {

    @PrimaryColumn()
    id: number;

    // 외래 키
    user_id: string;

    @Column({length: 40})
    uuid: string;
    @Column({length: 20})
    name: string;
    @Column({length: 100})
    email: string;
    @Column({length: 100})
    password: string;

    @Column("datetime", {
        name: "last_login_date"
    })
    lastLoginDate: Date;

    @CreateDateColumn({
        name: "created_at"
    })
    createdDate: Date;

    @UpdateDateColumn({
        name: "updated_at"
    })
    updatedDate: Date;
}