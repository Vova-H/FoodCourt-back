import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AvatarsService} from "./avatars.service";
import {AvatarsModel} from "./avatarts.model";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags("Avatars")
@Controller('avatars')
export class AvatarsController {

    constructor(private avatarService: AvatarsService) {
    }

    @Get()
    @ApiOperation({summary: "Getting all users"})
    @ApiResponse({status: 200, type: [AvatarsModel]})

    async getAllUsers() {
        return this.avatarService.getAllAvatars()
    }


    @UseInterceptors(FileInterceptor('value'))
    @Post()
    async createAvatar(@UploadedFile() value, @Body() userId) {
        return this.avatarService.createAvatar(value, userId)
    }

}
