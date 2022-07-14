import { IsString, MaxLength, MinLength } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class UpdateTaskDto {
    @MaxLength(25)
    @MinLength(4)
    @IsString()
    title: string;

    @IsString()
    @MaxLength(255)
    desc: string;

    @IsString()
    status: TaskStatus;
}
