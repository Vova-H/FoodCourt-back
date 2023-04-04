import {Body, Controller, Get, Post} from '@nestjs/common';
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
    async createOrder(@Body() cart) {
        return this.ordersService.createOrder(cart)
    }
}
