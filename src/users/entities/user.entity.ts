import { Task } from "src/tasks/entities/task.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../role.enum";


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({nullable: false, unique: true})
    email: string;

    @Column({nullable: false})
    password: string;
    
    @Column()
    roles: UserRole

    @OneToMany(()=>Task, (task)=> task.user, {eager: true})
    tasks: Task[];
}
