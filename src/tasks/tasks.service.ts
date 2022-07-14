
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { TaskStatus } from "./task-status.enum";

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) { }

    async getTasks(user:User): Promise<Task[]> {
        try {
            console.log('inside task repo');
            const tasks = await this.taskRepository.findBy(user);
            if (tasks) {
                return tasks;
            } else {
                throw new Error('empty collection');
            }
        } catch (error) {
            return error;
        }
    }

    async getTaskById(id: string, user:User): Promise<Task> {
        try {
            return await this.taskRepository.findOne({where: {id,user}});
        } catch (error) {
            return error;
        }
    }

    async getTaskByTitle(title: string): Promise<Task> {
        try { 
            console.log('inside getTaskByTiltle //');
            return await this.taskRepository.findOne({ where: { title: title }, relations:{user: true} });
        } catch (error) {
            console.log({ repo_err: error.message });
            return error;
        }
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<any> {
        // console.log('inside signup repo');
        console.log('inside create task repo dto', createTaskDto);
        try {
            const { title, desc } = createTaskDto;
            const task = new Task();
            task.desc = desc;
            task.title = title;
            task.status = TaskStatus.OPEN;
            task.user = user;

            let isExist = await this.taskRepository.findOneBy({ title });

            if (isExist) {
                throw new UnauthorizedException('task already exist');
            } else {
                return await this.taskRepository.save({
                    title: task.title,
                    desc: task.desc,
                    status: task.status,
                    user
                });

            }
        } catch (error) {
            // console.log("### This is  the catch bloc");
            return error;
        }
    }

    async updateTask(id: string, title?:string, desc?: string, status?:TaskStatus, user?:User): Promise<Task> {
   
        try {
            let task = await this.taskRepository.findOneBy({ id, user });
            await this.taskRepository.update(id, { title, desc, status });
            return await this.taskRepository.findOneBy({id});
        } catch (error) {
            return error
        }
    }

    async deleteTasks(): Promise<string> {
        try {
            await this.taskRepository.delete({});
            return "Ressources Deleted Successfuly!";
        } catch (error) {
            return error;
        }
    }

    async deleteTask(id: string, user?:User): Promise<string> {
        try {
            await this.taskRepository.delete({ id, user });
            return `Delete Task ${id} successfuly`;
        } catch (error) {
            return error;
        }
    }

}

