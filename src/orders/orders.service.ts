import {HttpException, Injectable} from '@nestjs/common';
import {OrdersModel} from "./orders.model";
import {InjectModel} from "@nestjs/sequelize";
import {OrdersDishesModel} from "../pivotTables/Orders_Dishes.model";

@Injectable()
export class OrdersService {

    constructor(@InjectModel(OrdersModel)
                private orderService: typeof OrdersService,
    ) {
    }

    async createOrder(cart) {
        const createDIshOrderHelper = async (orderId, product) => {
            await OrdersDishesModel.create({
                orderId: orderId,
                dishId: product[0].id,
                quantity: product[1]
            })
        }
        try {
            const date = new Date
            const dateOrder = date.toJSON().slice(0, 10)
            const timeOrder = date.toTimeString().slice(0, 8)
            const order = await OrdersModel.create({status: false, date: dateOrder, time: timeOrder})
            cart.forEach(product => {
                createDIshOrderHelper(order.dataValues.id, product)
            })
            return {"message": "You order was been created successfully"}

        } catch (e) {
            throw new HttpException("Bad request", 400)
        }

    }
}
