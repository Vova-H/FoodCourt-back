import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UsersModel} from "../users/users.model";
import {DishesModel} from "../dishes/dishes.model";


@Table({
    tableName: "carts"
})
export class CartsModel extends Model<CartsModel> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER})
    quantity: number;

    @ForeignKey(() => UsersModel)
    userId: number
    @BelongsTo(() => UsersModel)
    client: UsersModel

    @ForeignKey(() => DishesModel)
    dishId: number
    @BelongsTo(() => DishesModel)
    dish: DishesModel
}
