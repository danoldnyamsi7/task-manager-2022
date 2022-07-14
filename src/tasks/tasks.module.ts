import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersModule } from "../users/user.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Task]),
    
  ],
  controllers: [TasksController],
  providers: [TasksService] 
})
export class TasksModule {}
