import {Body, Controller, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {DishesService} from "./dishes.service";
import {DishesModel} from "./dishes.model";
import {FileInterceptor} from "@nestjs/platform-express";
import {AuthGuard} from "../auth/auth.guard";


@ApiTags("Dishes")
@Controller('dishes')
export class DishesController {
    constructor(private dishesService: DishesService) {
    }

    @Get()
    @ApiOperation({summary: "Getting all dishes"})
    @ApiResponse({status: 200, type: [DishesModel]})
    async getAllDishes(@Query('lang') lang) {
        return this.dishesService.getAllDishes(lang)
    }

    @Get(":id")
    async getImageById(@Param("id") id: number) {
        return this.dishesService.getImageById(id)
    }

    @UseGuards(AuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @ApiOperation({summary: "Add dish"})
    @ApiResponse({status: 200, type: [DishesModel]})
    async createDish(@UploadedFile() dtoDishImage, @Body() dtoDish) {
        return this.dishesService.createDish(dtoDish, dtoDishImage)
    }

    @UseGuards(AuthGuard)
    @Post("/favorites/check")
    async checkIsFavorites(@Body() dto) {
        return await this.dishesService.checkIsFavorites(dto.dishId, dto.userId)
    }

    @UseGuards(AuthGuard)
    @Get("/favorites/getAll")
    async getAllFavoritesDishes(@Query() dto) {
        return await this.dishesService.getAllFavoritesDishes(dto)
    }

    @UseGuards(AuthGuard)
    @Post("/favorites/add")
    async addToFavorites(@Body() dto) {
        return await this.dishesService.addToFavorites(dto.dishId, dto.userId)
    }

    @UseGuards(AuthGuard)
    @Post("/favorites/remove")
    async removeFromFavorites(@Body() dto) {
        return await this.dishesService.removeFromFavorites(dto.dishId, dto.userId)
    }

}

