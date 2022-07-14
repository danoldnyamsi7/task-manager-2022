import { CanActivate, ExecutionContext, Injectable, mixin, Type, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { use } from "passport";
import { Observable } from "rxjs";
import { UserRole } from "./role.enum";


// /* 
//   tout ca pour arriver a un seul point,
//   est ce que la le role de l'utilisateur match avec le role du guard ?
//   si oui la fonction renvoi 1 sinon 0
// */

// @Injectable()
// export class RolesGuard implements CanActivate {

//     constructor(private reflector: Reflector) { }

//     canActivate(context: ExecutionContext): boolean {
//         const request = context.switchToHttp().getRequest();
//         const user = request.user;
//         console.log(request);

//         // use reflector to collect the metadata that has been set to the route handler
//         const roleSetOnTheRouteHandler = this.reflector.get<String>('role', context.getHandler());

//         console.log("###" + roleSetOnTheRouteHandler);

//         // return false;
//         // console.log(user.roles)
//         if (roleSetOnTheRouteHandler) {
//             return true;
//         } else if (roleSetOnTheRouteHandler && (!user?.roles.includes(roleSetOnTheRouteHandler))) {
//             return false;
//         }
//     }

// }


const RoleGuard = (role: UserRole):Type<CanActivate> => {
    class RoleGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext) {
            const request = context.switchToHttp().getRequest();
            const user = request.user;

            return user?.roles.includes(role)
        }
    }
    return mixin(RoleGuardMixin);
}

export default RoleGuard;