import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UsersModel} from "../users/users.model";
import {FavoritesModel} from "../pivotTables/favorites.model";
import {OrdersDishesModel} from "../pivotTables/Orders_Dishes.model";
import {OrdersModel} from "../orders/orders.model";


interface DishCreationAttrs {
    name: string
    description: string
    imageName: string
    imageData: BinaryData
    weight: number
    calories: number
    price: number

    isFavorite: boolean
}

@Table({
    tableName: "dishes"
})
export class DishesModel extends Model<DishesModel, DishCreationAttrs> {
    @ApiProperty({example: 1, description: "uniq id"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ApiProperty({example: "name", description: "name of dish"})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;
    @ApiProperty({example: "some description", description: "description of dish"})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    description: string;

    @ApiProperty({example: "imgData", description: "data image of dish"})
    @Column({type: DataType.BLOB, allowNull: false})
    imageData: Uint8Array;

    @ApiProperty({example: "500", description: "weight of dish"})
    @Column({type: DataType.INTEGER, allowNull: false})
    weight: number;


    @ApiProperty({example: "700", description: "quantity calories"})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    calories: number;

    @ApiProperty({example: "30", description: "price of dish"})
    @Column({type: DataType.INTEGER, allowNull: false})
    price: number;


    @BelongsToMany(() => UsersModel, () => FavoritesModel)
    favorites: UsersModel[]


    @BelongsToMany(() => OrdersModel, () => OrdersDishesModel)
    orders: OrdersModel[]

}

