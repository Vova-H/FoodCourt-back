import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UsersModel} from "../users/users.model";
import {DishesModel} from "../dishes/dishes.model";


@Table({
    tableName: "favorites",
    createdAt: false,
    updatedAt: false
})

export class FavoritesModel extends Model<FavoritesModel> {
    @ApiProperty({example: 1, description: "uniq id"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => UsersModel)
    @ApiProperty({example: 1, description: "user id"})
    userId: number;
    @Column({type: DataType.INTEGER})
    @ForeignKey(() => DishesModel)
    @ApiProperty({example: 1, description: "dish id"})
    dishId: number;

    @Column({type: DataType.BOOLEAN})
    status: boolean

}
