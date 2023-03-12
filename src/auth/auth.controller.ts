import {Body, Controller, Post, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {RegistrationDto} from "./dto/registration.dto";
import {LoginDto} from "./dto/login.dto";
import {UsersModel} from "../users/users.model";
import ValidationPipe from "../pipes/validation.pipe"

@ApiTags("Authentication ")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: "Login"})
    @UsePipes(ValidationPipe)
    @Post("/login")
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    @ApiOperation({summary: "Registration new user"})
    @ApiResponse({status: 200, type: UsersModel})
    @Post("/registration")
    async registration(@Body() dto: RegistrationDto) {
        return this.authService.registration(dto)
    }

}
