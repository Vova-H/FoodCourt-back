import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {DishesModel} from "../dishes/dishes.model";
import {OrdersModel} from "../orders/orders.model";


@Table({
    tableName: "orders_dishes",
    createdAt: false,
    updatedAt: false,
})

export class OrdersDishesModel extends Model<OrdersDishesModel> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => DishesModel)
    dishId: number;

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => OrdersModel)
    orderId: number;

    @Column({type: DataType.INTEGER})
    quantity: number;
}
