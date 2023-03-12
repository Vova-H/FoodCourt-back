import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {tokenValidationHelper} from "../helpers/tokenValidation.helper";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const token = tokenValidationHelper(req)
            req.user = this.jwtService.verify(token);
            return true
        } catch (e) {
            console.log(e)
            throw new UnauthorizedException({message: "User is unauthorized "})
        }
    }

}
