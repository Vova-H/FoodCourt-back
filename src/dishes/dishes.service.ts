import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {DishesModel} from "./dishes.model";
import {FavoritesModel} from "../pivotTables/favorites.model";
import {TranslationService} from "../translation/translation.service";
import {UsersModel} from "../users/users.model";
import {RolesModel} from "../roles/roles.model";


@Injectable()
export class DishesService {
    constructor(@InjectModel(DishesModel)
                private dishesModel: typeof DishesModel,
                private translationService: TranslationService
    ) {
    }

    async getAllDishes(lang: string, userId: string) {
        const user = await UsersModel.findOne({
            where: {id: userId},
            include: {model: RolesModel}
        })
        const roles = user ? user.roles.map(role => {
            return role.dataValues.role
        }) : ["USER"]
        let allDishes;
        if (roles.includes("ADMIN")) {
            allDishes = await DishesModel.findAll({
                order: [
                    ["isActive", "DESC"],
                    ["id", "ASC"]
                ]
            });
        } else {
            allDishes = await DishesModel.findAll({
                where: {isActive: true},
                order: [
                    ["id", "ASC"]
                ]
            });
        }

        return await Promise.all(
            allDishes.map(async (dish) => {
                return {
                    id: dish.id,
                    name: await this.translationService.translateText(dish.name, lang),
                    description: await this.translationService.translateText(dish.description, lang),
                    weight: dish.weight,
                    calories: dish.calories,
                    price: dish.price,
                    isActive: dish.isActive,
                    image: Buffer.from(dish.imageData).toString('base64'),
                };
            }),
        );
    }

    async getDishesByKeywords(lang: string, keywords: string, userId: string) {
        const user = await UsersModel.findOne({
            where: {id: userId},
            include: {model: RolesModel}
        })
        const roles = user ? user.roles.map(role => {
            return role.dataValues.role
        }) : ["USER"]
        let allDishes;
        if (roles.includes("ADMIN")) {
            allDishes = await DishesModel.findAll({
                order: [
                    ["isActive", "DESC"],
                    ["id", "ASC"]
                ]
            });
        } else {
            allDishes = await DishesModel.findAll({
                where: {isActive: true},
                order: [["id", "ASC"]]
            });
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
                        isActive: dish.isActive,
                        image: Buffer.from(dish.imageData).toString('base64'),
                    };
                } else {
                    return null;
                }
            })
        );
        return result.filter(el => el !== null)
    }

    async hideDish(dishId: string) {
        const dish = await DishesModel.findOne({
            where: {
                id: dishId
            }
        })
        dish.isActive = false
        await dish.save()
    }

    async showDish(dishId: string) {
        const dish = await DishesModel.findOne({
            where: {
                id: dishId
            }
        })
        dish.isActive = true
        await dish.save()
    }


    async createDish(dtoDish, dtoDishImage) {
        const dish = {
            ...dtoDish,
            imageName: dtoDishImage.originalname,
            imageData: dtoDishImage.buffer,
        }
        await DishesModel.create(dish)
        throw new HttpException("The dish was added successfully", HttpStatus.CREATED)
    }

    async editDish(dtoDish, dtoDishImage, id) {

        const existingDish = await DishesModel.findOne({where: {id: id.id}});

        if (!existingDish) {
            throw new HttpException("Dish not found", HttpStatus.NOT_FOUND);
        }
        const updatedDish = {
            ...dtoDish,
            imageName: dtoDishImage.originalname,
            imageData: dtoDishImage.buffer,
        };

        await DishesModel.update(updatedDish, {where: {id: id.id}});

        throw new HttpException("The dish was updated successfully", HttpStatus.OK);
    }


    async getDishById(id: number) {
        const dish = await DishesModel.findOne({where: {id}})
        return {
            id: dish.id,
            name: dish.name,
            description: dish.description,
            weight: dish.weight,
            calories: dish.calories,
            price: dish.price,
            image: Buffer.from(dish.imageData).toString('base64'),
        }
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

    async getAllFavoritesDishes({userId}, lang) {
        const favorites = await FavoritesModel.findAll({
            where: {userId, status: true},
        });

        const ids = favorites.map(fav => fav.dishId);
        const dishes = await this.dishesModel.findAll({
            where: {id: ids},
        });
        return await Promise.all(
            dishes.map(async dish => ({
                id: dish.id,
                name: await this.translationService.translateText(dish.name, lang),
                description: await this.translationService.translateText(dish.description, lang),
                weight: dish.weight,
                calories: dish.calories,
                price: dish.price,
                image: Buffer.from(dish.imageData).toString('base64'),
            })));
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

