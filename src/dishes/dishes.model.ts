import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
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
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    description: string;

    @Column({type: DataType.BLOB, allowNull: false})
    imageData: Uint8Array;

    @Column({type: DataType.INTEGER, allowNull: false})
    weight: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    calories: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    price: number;

    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: true})
    isActive: boolean;


    @BelongsToMany(() => UsersModel, () => FavoritesModel)
    favorites: UsersModel[]

    @BelongsToMany(() => OrdersModel, () => OrdersDishesModel)
    orders: OrdersModel[]

}

