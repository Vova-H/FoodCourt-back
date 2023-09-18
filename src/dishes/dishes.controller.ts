import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {DishesService} from "./dishes.service";
import {DishesModel} from "./dishes.model";
import {FileInterceptor} from "@nestjs/platform-express";
import {AuthGuard} from "../auth/auth.guard";
import {ValidationPipe} from "../pipes/validation.pipe";
import {Roles} from "../permissions/roles.decorator";
import {RolesGuard} from "../permissions/roles.guard";


@ApiTags("Dishes")
@Controller('dishes')
export class DishesController {
    constructor(private dishesService: DishesService) {
    }

    @Get()
    @ApiOperation({summary: "Getting all dishes"})
    @ApiResponse({status: 200, type: [DishesModel]})
    async getAllDishes(@Query('lang') lang: string, @Query('userId') userId: string) {
        return this.dishesService.getAllDishes(lang, userId)
    }

    @UsePipes(ValidationPipe)
    @Post("/search")
    @ApiOperation({summary: "Getting dishes by keywords"})
    @ApiResponse({status: 200, type: [DishesModel]})
    async getDishesByKeywords(@Query('lang') lang: string, @Query('words') words: string, @Query('userId') userId: string) {
        return this.dishesService.getDishesByKeywords(lang, words, userId)
    }

    @UseGuards(AuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/hide/:id")
    @ApiOperation({summary: "Change visibility on hide"})
    async hideDish(@Param('id') dishId: string) {
        return this.dishesService.hideDish(dishId)
    }

    @UseGuards(AuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/show/:id")
    @ApiOperation({summary: "Change visibility on show"})
    async showDish(@Param('id') dishId: string) {
        return this.dishesService.showDish(dishId)
    }


    @Get("/:id")
    async getDishById(@Param("id") id: number) {
        return this.dishesService.getDishById(id)
    }

    @UseGuards(AuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/add")
    @UseInterceptors(FileInterceptor('image'))
    @ApiOperation({summary: "Add dish"})
    @ApiResponse({status: 200, type: [DishesModel]})
    async createDish(@UploadedFile() image, @Body() dish) {
        const dtoDish = JSON.parse(dish.dish)
        return this.dishesService.createDish(dtoDish, image)
    }


    @UseGuards(AuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post("/edit/:id")
    @UseInterceptors(FileInterceptor('image'))
    @ApiOperation({summary: "Edit dish"})
    @ApiResponse({status: 200, type: [DishesModel]})
    async editDish(@UploadedFile() image, @Body() dish, @Param() id: number) {
        const dtoDish = JSON.parse(dish.dish)
        return this.dishesService.editDish(dtoDish, image, id)
    }


    @UseGuards(AuthGuard)
    @Post("/favorites/check")
    async checkIsFavorites(@Body() dto) {
        return await this.dishesService.checkIsFavorites(dto.dishId, dto.userId)
    }

    @UseGuards(AuthGuard)
    @Get("/favorites/getAll")
    async getAllFavoritesDishes(@Query() dto, @Query('lang') lang: string) {
        return await this.dishesService.getAllFavoritesDishes(dto, lang)
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

