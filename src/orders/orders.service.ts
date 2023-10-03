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
                private translationService: TranslationService,
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
            await this.getAllActiveOrders({"lang": lang})
            return {"message": await this.translationService.translateText("You order was been created successfully", lang)}

        } catch (e) {
            console.log(e)
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
            order: [["id", "DESC"]]
        });
        for (const order of orders) {
            for (const dish of order.dataValues.dishes) {
                dish.dataValues.name = await this.translationService.translateText(dish.dataValues.name, dto.lang);
            }
        }
        return orders;
    }

    async completeOrderById(dto) {
        try {
            const order = await OrdersModel.findOne({where: {id: dto.id}})
            if (!order) {
                return {"message": "There are no orders with such id", "status": 404}
            } else {
                order.status = true
                await order.save()
                return {"message": "The order was completed", "status": 200}
            }

        } catch (e) {
            console.log(e)
            throw new HttpException("Bad request", 400)
        }
    }

    async getAllOrders(dto) {
        if (dto.lang === "ua") {
            dto.lang = "uk"
        }
        const orders = await OrdersModel.findAll({
            include: [{model: DishesModel, attributes: ["name", "price"]}],
            order: [["id", "DESC"]]
        });
        for (const order of orders) {
            for (const dish of order.dataValues.dishes) {
                dish.dataValues.name = await this.translationService.translateText(dish.dataValues.name, dto.lang);
            }
        }
        return orders;
    }

    async getAllActiveOrders(dto) {
        if (dto.lang === "ua") {
            dto.lang = "uk"
        }
        const orders = await OrdersModel.findAll({
            where: {status: false},
            include: [{model: DishesModel, attributes: ["name", "price"]}],
            order: [["id", "DESC"]]
        });

        for (const order of orders) {
            for (const dish of order.dataValues.dishes) {
                dish.dataValues.name = await this.translationService.translateText(dish.dataValues.name, dto.lang);
            }
        }
        return orders;
    }

    async getAllCompletedOrders(dto) {
        if (dto.lang === "ua") {
            dto.lang = "uk"
        }
        const orders = await OrdersModel.findAll({
            where: {status: true},
            include: [{model: DishesModel, attributes: ["name", "price"]}],
            order: [["id", "DESC"]]
        });
        for (const order of orders) {
            for (const dish of order.dataValues.dishes) {
                dish.dataValues.name = await this.translationService.translateText(dish.dataValues.name, dto.lang);
            }
        }
        return orders;
    }
}
