import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/users/entities/user.entity";
import { GetUser } from "src/users/getUser.decorator";
import { UserRole } from "src/users/role.enum";
import RoleGuard from "src/users/role.guard";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./entities/task.entity";
import { TaskStatus } from "./task-status.enum";
import { TasksService } from "./tasks.service";

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    try {
      const Task = await this.taskService.createTask(createTaskDto, user)
      return Task;
    } catch (error) {
      return error;
    }
  }

  @Get()
  @UseGuards(RoleGuard(UserRole.ADMIN))
  // @UseInterceptors(TaskInterceptor)
  async getTasks(@GetUser() user: User): Promise<Task[]> {
    try {
      const tasks = await this.taskService.getTasks(user);
      if(tasks){
        return tasks;
      }else{
        throw new BadRequestException({message: `failed to fetch ${user.email} tasks`});
      }
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async getTaskById(id: string, @GetUser() user: User): Promise<Task> {
    console.log('inside controllr ', id)
    try {
      return await this.taskService.getTaskById(id, user);
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body('title') title?: string, @Body('desc') desc?: string, @Body('status') status?: TaskStatus, @GetUser() user?:User): Promise<Task> {
    try {
      const task = await this.taskService.getTaskById(id, user);
      if (task) {
        return await this.taskService.updateTask(id, title, desc, status);
        
      } else {
        throw new BadRequestException({ message: 'failed to update, user does not exist' });
      }
    }
    catch (error) {
      return error;
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id:string, @GetUser() user?:User):Promise<{}>{
    try {
      const task = await this.getTaskById(id, user);
      if(task){
        await this.taskService.deleteTask(id, user);
        return {message: `task ${id} deleted successfuly`};
      }else{
        throw new BadRequestException({message: 'task does not exist'});
      }
    } catch (error) {
      return error;
    }
  }

  @Delete()
  @UseGuards(AuthGuard())
  async deleteTasks():Promise<{}>{
    try {
      await this.taskService.deleteTasks()
      return { message: "tasks deleted successfuly!" }
    } catch (error) {
      return error;
    }
  }

}