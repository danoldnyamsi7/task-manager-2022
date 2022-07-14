import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { APP_GUARD } from '@nestjs/core';
import  RoleGuard  from './users/role.guard';
// import { PassportModule } from "@nestjs/passport";
// import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'manageDB',
      entities: [User, Task],
      synchronize: true,
      autoLoadEntities: true
    }),
    UsersModule,
    TasksModule,
  
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard
    // }
    
  ],
})
export class AppModule { }