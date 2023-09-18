import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CartsModel} from "./carts.model";
import {DishesModel} from "../dishes/dishes.model";


@Injectable()
export class CartsService {
    constructor(@InjectModel(CartsModel)
                private cartModel: typeof CartsModel
    ) {
    }

    async getCart(userId) {
        const cartsModels = await CartsModel.findAll({
            where: {userId: userId},
            include: {model: DishesModel}
        })
        return cartsModels.map(cartsModel => (
            [{
                id: cartsModel.id,
                userId: cartsModel.userId,
                dish: {
                    id: cartsModel.dish.id,
                    name: cartsModel.dish.name,
                    description: cartsModel.dish.description,
                    weight: cartsModel.dish.weight,
                    calories: cartsModel.dish.calories,
                    price: cartsModel.dish.price,
                    image: Buffer.from(cartsModel.dish.imageData).toString('base64'),
                }
            },
                cartsModel.quantity
            ]
        ))
    }

    async addToCart(dto) {
        return await CartsModel.create({dishId: dto.dishId, userId: dto.userId, quantity: dto.quantity})
    }

    async removeFromCart(dishId, userId) {
        return CartsModel.destroy({where: {dishId: dishId, userId: userId}})
    }

    async deleteCart(userId) {
        return CartsModel.destroy({where: {userId: userId}})
    }

}
