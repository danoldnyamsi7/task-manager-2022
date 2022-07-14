import { IsString, MaxLength, MinLength } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { TaskStatus } from "../task-status.enum";

export class CreateTaskDto {
    @MaxLength(25)
    @MinLength(4)
    @IsString()
    title: string;

    @IsString()
    @MaxLength(255)
    desc: string;

    status: TaskStatus
}
