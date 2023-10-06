import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CartsModel} from "./carts.model";
import {DishesModel} from "../dishes/dishes.model";
import {TranslationService} from "../translation/translation.service";


@Injectable()
export class CartsService {
    constructor(@InjectModel(CartsModel)
                private cartModel: typeof CartsModel,
                private translationService: TranslationService
    ) {
    }

    async getCart(userId, lang) {
        const cartsModels = await CartsModel.findAll({
            where: { userId: userId },
            include: { model: DishesModel }
        });

        const translationPromises = cartsModels.map(async (cartsModel) => {

            const translatedName = await this.translationService.translateText(cartsModel.dish.name, lang);
            const translatedDescription = await this.translationService.translateText(cartsModel.dish.description, lang);

            return {
                dish: {
                    id: cartsModel.dish.id,
                    name: translatedName,
                    description: translatedDescription,
                    weight: cartsModel.dish.weight,
                    calories: cartsModel.dish.calories,
                    price: cartsModel.dish.price,
                    image: Buffer.from(cartsModel.dish.imageData).toString('base64'),
                },
                quantity: cartsModel.quantity,
            };
        });

        const translatedCarts = await Promise.all(translationPromises);

        return translatedCarts.map((item) => [item, item.quantity]);
    }


    async addToCart(dto, lang) {
        const foundedCart = await CartsModel.findOne({where: {dishId: dto.dishId, userId: dto.userId}})
        if (!foundedCart) {
            await CartsModel.create({dishId: dto.dishId, userId: dto.userId, quantity: dto.quantity})
        }
        return this.getCart(dto.userId, lang)
    }

    async removeFromCart(dishId, userId, lang) {
        await CartsModel.destroy({where: {dishId: dishId, userId: userId}})
        return this.getCart(userId, lang)
    }

    async deleteCart(userId) {
        return CartsModel.destroy({where: {userId: userId}})
    }

}
