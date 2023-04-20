import {Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
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
    @UseInterceptors(FileInterceptor('image'))
    @ApiOperation({summary: "Add dish"})
    @ApiResponse({status: 200, type: [DishesModel]})
    async createDish(@UploadedFile() dtoDishImage, @Body() dtoDish) {
        return this.dishesService.createDish(dtoDish, dtoDishImage)
    }


    @Post("/favorites/check")
    async checkIsFavorites(@Body() dto) {
        return await this.dishesService.checkIsFavorites(dto.dishId, dto.userId)
    }

    @Get("/favorites/getAll")
    async getAllFavoritesDishes(@Query() dto) {
        return await this.dishesService.getAllFavoritesDishes(dto)
    }

    @Post("/favorites/add")
    async addToFavorites(@Body() dto) {
        return await this.dishesService.addToFavorites(dto.dishId, dto.userId)
    }

    @Post("/favorites/remove")
    async removeFromFavorites(@Body() dto) {
        return await this.dishesService.removeFromFavorites(dto.dishId, dto.userId)
    }

}

