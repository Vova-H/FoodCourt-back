import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {tokenValidationHelper} from "../helpers/tokenValidation.helper";
import {ROLES_KEY} from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])

            if (!requiredRoles) {
                return true
            }

            const req = context.switchToHttp().getRequest()
            const token = tokenValidationHelper(req)
            const user = this.jwtService.verify(token)
            req.user = user
            return user.roles.some(role => requiredRoles.includes(role.role))
        } catch (e) {
            console.log(e)
            throw new HttpException("Access Denied", HttpStatus.FORBIDDEN)
        }
    }
}
