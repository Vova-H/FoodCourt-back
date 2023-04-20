import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UsersModel} from "../users/users.model";
import {DishesModel} from "../dishes/dishes.model";


@Table({
    tableName: "carts"
})
export class CartsModel extends Model<CartsModel> {
    @ApiProperty({example: 1, description: "uniq id"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    // @ApiProperty({example: 1, description: "dish id"})
    // @Column({type: DataType.INTEGER})
    // dishId: number;

    @ApiProperty({example: 1, description: "quantity of dish"})
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
