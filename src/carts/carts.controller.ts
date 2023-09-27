import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {CartsService} from "./carts.service";
import {AuthGuard} from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('carts')
export class CartsController {
    constructor(private cartService: CartsService) {
    }

    @Get("get")
    async getCart(@Query() dto) {
        return this.cartService.getCart(dto.userId)
    }

    @Post("add")
    async addToCart(@Body() dto) {
        return this.cartService.addToCart(dto)
    }

    @Post("removeOne")
    async removeFromCart(@Body() dto) {
        return this.cartService.removeFromCart(dto.cartItemId, dto.userId)
    }

    @Post("remove")
    async deleteCart(@Body() dto) {
        return this.cartService.deleteCart(dto.userId)
    }

}
