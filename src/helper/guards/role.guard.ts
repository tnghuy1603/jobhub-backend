import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "../enum/role.enum";
import { ROLES_KEY } from "../decorator/role.decorator";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
        if(!requiredRoles){
            return true;
        };
        console.log(`Required roles: ${requiredRoles.join(',')}`);
        
        const {user} = context.switchToHttp().getRequest();
        let userRoles: string[] = user?.roles || [];
        console.log("UserRole: " + userRoles);
        return requiredRoles.some((role) => userRoles.includes(role));
    }
}