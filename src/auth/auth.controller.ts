import {Body, Controller, Post, Query} from '@nestjs/common';
import {AuthService} from "./auth.service";


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post("/login")
    async login(@Body() dto, @Query('lang') lang) {
        const {token} = await this.authService.login(dto, lang)
        return {token}
    }

    @Post("/registration")
    async registration(@Body() dto, @Query('lang') lang: string) {
        return this.authService.registration(dto, lang)
    }

}
