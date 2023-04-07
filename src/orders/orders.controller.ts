import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {UsersModel} from "../users/users.model";
import {RegistrationDto} from "../auth/dto/registration.dto";
import {UsersService} from "../users/users.service";
import {OrdersService} from "./orders.service";
import {OrdersModel} from "./orders.model";

@Controller('orders')
export class OrdersController {

    constructor(private ordersService: OrdersService) {
    }

    @Post("create")
    @ApiOperation({summary: "Creating new order"})
    @ApiResponse({status: 200, type: OrdersModel})
    async createOrder(@Query() clientId: number, @Body() cart) {
        return this.ordersService.createOrder(cart, clientId)
    }

    @Get("getOrderByClientId")
    async getOrderByClientId(@Query() dto) {
        return this.ordersService.getOrderByClientId(dto)
    }
}
