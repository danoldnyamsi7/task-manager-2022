import { Exclude } from "class-transformer";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../task-status.enum";

@Entity()
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, unique: true })
    title: string;

    @Column({ nullable: false })
    desc: string;

    @Column({default:'OPEN'})
    status: TaskStatus;

    @ManyToOne(()=>User, (user)=>user.tasks, {eager: false})
    user: User;
}
