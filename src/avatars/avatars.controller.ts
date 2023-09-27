import {Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {AvatarsService} from "./avatars.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {AuthGuard} from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('avatars')
export class AvatarsController {

    constructor(private avatarService: AvatarsService) {
    }

    @UseInterceptors(FileInterceptor('value'))
    @Post("/change")
    async changeAvatar(@UploadedFile() value, @Body() dto) {
        return this.avatarService.changeAvatar(value, dto.userId)
    }

}
