import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {AuthGuard} from "../auth/auth.guard";

@UseGuards(AuthGuard)

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {
    }

    @Post("create")
    async createOrder(@Query() clientId, @Body() cart, @Query("lang") lang, @Query("discount") discount) {
        return await this.ordersService.createOrder(cart, clientId, lang, discount);
    }

    @Get("getOrderByClientId")
    async getOrderByClientId(@Query() dto) {
        return this.ordersService.getOrderByClientId(dto);
    }

    @Post("completeOrderById")
    async completeOrderById(@Query() dto) {
        return this.ordersService.completeOrderById(dto);
    }

    @Post("getAllOrders")
    async getAllOrders(@Query() dto) {
        return this.ordersService.getAllOrders(dto);
    }

    @Post("getAllActiveOrders")
    async getAllActiveOrders(@Query() dto) {
        const lang = dto.lang;
        return await this.ordersService.getAllActiveOrders({lang});

    }

    @Post("getAllCompletedOrders")
    async getAllCompletedOrders(@Query() dto) {
        return this.ordersService.getAllCompletedOrders(dto);
    }
}
