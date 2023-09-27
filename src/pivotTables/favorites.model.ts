import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";

import {UsersModel} from "../users/users.model";
import {DishesModel} from "../dishes/dishes.model";


@Table({
    tableName: "favorites",
    createdAt: false,
    updatedAt: false
})

export class FavoritesModel extends Model<FavoritesModel> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => UsersModel)
    userId: number;
    @Column({type: DataType.INTEGER})
    @ForeignKey(() => DishesModel)
    dishId: number;

    @Column({type: DataType.BOOLEAN})
    status: boolean

}
