import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {DishesModel} from "./dishes.model";


@Injectable()
export class DishesService {
    constructor(@InjectModel(DishesModel)
                private dishesModel: typeof DishesModel
    ) {
    }

    async getAllDishes() {
        const allDishes = await DishesModel.findAll({include: {all: true}})
        const newDishes = []
        allDishes.forEach((dish) => {
            newDishes.push({
                id: dish.id,
                name: dish.name,
                description: dish.description,
                weight: dish.weight,
                calories: dish.calories,
                price: dish.price,
                image: Buffer.from(dish.imageData).toString('base64'),
            })
        })
        return newDishes
    }

    async createDish(dtoDish, dtoDishImage) {
        const dish = {
            ...dtoDish,
            imageName: dtoDishImage.originalname,
            imageData: dtoDishImage.buffer,
        }
        await DishesModel.create(dish)
        return dish
    }

    async getImageById(id) {
        const dish = await DishesModel.findOne({where: id})
        const b64 = Buffer.from(dish.imageData).toString('base64');
        return `<img src="data:image/jpeg;base64,${b64}"  alt="img"/>`
    }
}

