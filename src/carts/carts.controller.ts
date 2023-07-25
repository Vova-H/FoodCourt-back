import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {CartsService} from "./carts.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {CartsModel} from "./carts.model";
import {AuthGuard} from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('carts')
export class CartsController {
    constructor(private cartService: CartsService) {
    }

    @Get("get")
    @ApiOperation({summary: "Getting Cart"})
    @ApiResponse({status: 200, type: [CartsModel]})
    async getCart(@Query() dto) {
        return this.cartService.getCart(dto.userId)
    }

    @Post("add")
    @ApiOperation({summary: "add item into cart"})
    @ApiResponse({status: 200, type: [CartsModel]})
    async addToCart(@Body() dto) {
        return this.cartService.addToCart(dto)
    }

    @Post("update")
    async updateCart() {
        return this.cartService.updateCart()
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
