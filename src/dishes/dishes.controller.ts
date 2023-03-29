import {Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {DishesService} from "./dishes.service";
import {DishesModel} from "./dishes.model";
import {FileInterceptor} from "@nestjs/platform-express";


@ApiTags("Dishes")
@Controller('dishes')
export class DishesController {
    constructor(private dishesService: DishesService) {
    }

    @Get()
    @ApiOperation({summary: "Getting all dishes"})
    @ApiResponse({status: 200, type: [DishesModel]})

    async getAllDishes() {
        return this.dishesService.getAllDishes()
    }

    @Get("/:params")
    async getImageById(@Query() id: number) {
        return this.dishesService.getImageById(id)
    }

    @Post()
    @UseInterceptors(FileInterceptor('imageData'))
    @ApiOperation({summary: "Add dish"})
    @ApiResponse({status: 200, type: [DishesModel]})
    async createDish(@UploadedFile() dtoDishImage, @Body() dtoDish) {
        return this.dishesService.createDish(dtoDish, dtoDishImage)
    }
}

