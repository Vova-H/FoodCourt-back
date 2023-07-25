import {Body, Controller, Post, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {UsersModel} from "../users/users.model";

@ApiTags("Authentication ")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: "Login"})
    @Post("/login")
    async login(@Body() dto: LoginDto, @Query('lang') lang) {
        const {token} = await this.authService.login(dto, lang)
        return {token}
    }

    @ApiOperation({summary: "Registration new user"})
    @ApiResponse({status: 200, type: UsersModel})
    @Post("/registration")
    async registration(@Body() dto, @Query('lang') lang) {
        return this.authService.registration(dto, lang)
    }

}
