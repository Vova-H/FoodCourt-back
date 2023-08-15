import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {OrdersService} from "./orders.service";
import {OrdersModel} from "./orders.model";
import {AuthGuard} from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {

    constructor(private ordersService: OrdersService) {
    }

    @Post("create")
    @ApiOperation({summary: "Creating new order"})
    @ApiResponse({status: 200, type: OrdersModel})
    async createOrder(@Query() clientId, @Body() cart, @Query("lang") lang, @Query("discount") discount) {
        return this.ordersService.createOrder(cart, clientId, lang, discount)
    }

    @Get("getOrderByClientId")
    async getOrderByClientId(@Query() dto) {
        return this.ordersService.getOrderByClientId(dto)
    }
}
