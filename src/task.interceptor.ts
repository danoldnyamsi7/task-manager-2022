import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Transform } from "class-transformer";
// import { classToPlain } from "class-transformer";
import { map, Observable, pipe } from "rxjs";
import { Task } from "./tasks/entities/task.entity";



@Injectable()
export class TaskInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        let user_obj = context.switchToHttp().getResponse();
        const task_list = user_obj;
        
        const expose = ({title, desc, status})=>({title, desc, status})

        return next
        .handle()
        .pipe(map((data)=> user_obj));
        

    }
}