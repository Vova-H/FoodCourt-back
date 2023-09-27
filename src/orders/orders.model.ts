import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {DishesModel} from "../dishes/dishes.model";
import {OrdersDishesModel} from "../pivotTables/Orders_Dishes.model";
import {UsersModel} from "../users/users.model";


interface OrdersCreationAttrs {
    status: boolean
    date: string
    time: string
    clientId: number,
    discount: boolean
}

@Table({
    tableName: "orders"
})
export class OrdersModel extends Model<OrdersModel, OrdersCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.BOOLEAN, allowNull: false})
    status: boolean;

    @Column({type: DataType.DATEONLY, unique: false, allowNull: false})
    date: string;

    @Column({type: DataType.TIME, allowNull: false})
    time: string;

    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    discount: boolean;

    @ForeignKey(() => UsersModel)
    clientId: number

    @BelongsToMany(() => DishesModel, () => OrdersDishesModel)
    dishes: DishesModel[]

    @BelongsTo(() => UsersModel)
    client: UsersModel

}

