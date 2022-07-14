import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./entities/user.entity";



export const GetUser = createParamDecorator((_data:unknown, context: ExecutionContext):User=>{
    // the aim with this decorator is to return the user that is making the request
    // whatever we return from this funtion is going to be the value of the parameter that we decorate
    const request = context.switchToHttp().getRequest();
    return request.user;
})
