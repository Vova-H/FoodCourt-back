import {Body, Controller, Post, UploadedFile, UseInterceptors, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {RegistrationDto} from "./dto/registration.dto";
import {LoginDto} from "./dto/login.dto";
import {UsersModel} from "../users/users.model";
import ValidationPipe from "../pipes/validation.pipe"
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags("Authentication ")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: "Login"})
    @UsePipes(ValidationPipe)
    @Post("/login")
    async login(@Body() dto: LoginDto) {
        const {token} = await this.authService.login(dto)
        return {token}
    }

    @ApiOperation({summary: "Registration new user"})
    @ApiResponse({status: 200, type: UsersModel})
    @Post("/registration")
    async registration(@Body() dto) {
        return this.authService.registration(dto)
    }

}
