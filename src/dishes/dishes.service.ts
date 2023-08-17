import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {DishesModel} from "./dishes.model";
import {FavoritesModel} from "../pivotTables/favorites.model";
import {TranslationService} from "../translation/translation.service";


@Injectable()
export class DishesService {
    constructor(@InjectModel(DishesModel)
                private dishesModel: typeof DishesModel,
                private translationService: TranslationService
    ) {
    }

    async getAllDishes(lang: string) {
        const allDishes = await DishesModel.findAll()
        if (lang === "ua") {
            lang = "uk"
        }
        return await Promise.all(
            allDishes.map(async (dish) => {
                return {
                    id: dish.id,
                    // name: dish.name,
                    // description: dish.description,
                    name: await this.translationService.translateText(dish.name, lang),
                    description: await this.translationService.translateText(dish.description, lang),
                    weight: dish.weight,
                    calories: dish.calories,
                    price: dish.price,
                    image: Buffer.from(dish.imageData).toString('base64'),
                };
            }),
        );
    }

    async getDishesByKeywords(lang: string, keywords: string) {
        const allDishes = await DishesModel.findAll();

        if (lang === "ua") {
            lang = "uk";
        }

        if (lang !== "en") {
            const keywordsEng = await this.translationService.translateText(keywords, "en");
            var searchTerms = keywordsEng.toLowerCase().split(' ');
        } else {
            var searchTerms = keywords.toLowerCase().split(' ');
        }

        const result = await Promise.all(
            allDishes.map(async (dish) => {
                const containsKeyword = searchTerms.some(term =>
                    dish.name.toLowerCase().includes(term) || dish.description.toLowerCase().includes(term)
                );

                if (containsKeyword) {
                    const translatedName = await this.translationService.translateText(dish.name, lang);
                    const translatedDescription = await this.translationService.translateText(dish.description, lang);
                    return {
                        id: dish.id,
                        name: translatedName,
                        description: translatedDescription,
                        weight: dish.weight,
                        calories: dish.calories,
                        price: dish.price,
                        image: Buffer.from(dish.imageData).toString('base64'),
                    };
                } else {
                    return null;
                }
            })
        );
        return result.filter(el => el !== null)
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
        const dish = await DishesModel.findOne({where: {id: id}})
        const b64 = Buffer.from(dish.imageData).toString('base64');
        return `<img src="data:image/jpeg;base64,${b64}"  alt="img"/>`
    }

    async checkIsFavorites(dishId, userId) {
        const favorites = await FavoritesModel.findOne({where: {userId: userId, dishId: dishId}})
        if (favorites) {
            return favorites.status
        }
        const favorite = await FavoritesModel.create({userId: userId, dishId: dishId, status: false})
        await favorite.save()
        return favorite.status
    }

    async getAllFavoritesDishes({userId}) {
        const favorites = await FavoritesModel.findAll({
            where: {userId: userId, status: true},
        })
        const ids = favorites.map((id) => {
            return id.dishId
        })
        const dishes = await DishesModel.findAll({
            where: {id: ids}
        })

        const filteredDishes = []
        dishes.forEach((dish) => {
            filteredDishes.push({
                id: dish.id,
                name: dish.name,
                description: dish.description,
                weight: dish.weight,
                calories: dish.calories,
                price: dish.price,
                image: Buffer.from(dish.imageData).toString('base64'),
            })
        })
        return filteredDishes
    }

    async addToFavorites(dishId, userId) {
        const favorite = await FavoritesModel.findOne({where: {userId: userId, dishId: dishId}})
        favorite.status = true
        await favorite.save()
        return favorite.status
    }

    async removeFromFavorites(dishId, userId) {
        const favorite = await FavoritesModel.findOne({where: {userId: userId, dishId: dishId}})
        favorite.status = false
        await favorite.save()
        return favorite.status
    }

}

