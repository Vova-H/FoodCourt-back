import {HttpException, Injectable} from '@nestjs/common';
import {OrdersModel} from "./orders.model";
import {InjectModel} from "@nestjs/sequelize";
import {OrdersDishesModel} from "../pivotTables/Orders_Dishes.model";
import {DishesModel} from "../dishes/dishes.model";
import {TranslationService} from "../translation/translation.service";

@Injectable()
export class OrdersService {

    constructor(@InjectModel(OrdersModel)
                private orderService: typeof OrdersService,
                private translationService: TranslationService
    ) {
    }

    async createOrder(cart, clientId, lang, discount) {
        if (lang === "ua") {
            lang = "uk"
        }
        try {
            const createDIshOrderHandler = async (orderId, product) => {
                await OrdersDishesModel.create({
                    orderId: orderId,
                    dishId: product[0].id,
                    quantity: product[1]
                })
            }
            const date = new Date
            const dateOrder = date.toJSON().slice(0, 10)
            const timeOrder = date.toTimeString().slice(0, 8)
            const order = await OrdersModel.create({
                clientId: clientId.clientId,
                status: false,
                date: dateOrder,
                time: timeOrder,
                discount: discount
            })
            cart.forEach(product => {
                createDIshOrderHandler(order.dataValues.id, product)
            })
            return {"message": await this.translationService.translateText("You order was been created successfully", lang)}

        } catch (e) {
            throw new HttpException("Bad request", 400)
        }

    }

    async getOrderByClientId(dto) {
        if (dto.lang === "ua") {
            dto.lang = "uk"
        }
        const orders = await OrdersModel.findAll({
            where: {clientId: dto.clientId},
            include: [{model: DishesModel, attributes: ["name", "price"]}],
        });
        for (const order of orders) {
            for (const dish of order.dataValues.dishes) {
                dish.dataValues.name = await this.translationService.translateText(dish.dataValues.name, dto.lang);
            }
        }
        return orders;
    }
}
