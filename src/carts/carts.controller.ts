import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {CartsService} from "./carts.service";
import {AuthGuard} from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('carts')
export class CartsController {
    constructor(private cartService: CartsService) {
    }

    @Get("get")
    async getCart(@Query() params) {
        return this.cartService.getCart(params.userId, params.lang)
    }

    @Post("add")
    async addToCart(@Body() dto, @Query("lang") lang) {
        return this.cartService.addToCart(dto, lang)
    }

    @Post("removeOne")
    async removeFromCart(@Body() dto, @Query("lang") lang) {
        return this.cartService.removeFromCart(dto.cartItemId, dto.userId, lang)
    }

    @Post("remove")
    async deleteCart(@Body() dto) {
        return this.cartService.deleteCart(dto.userId)
    }

}
