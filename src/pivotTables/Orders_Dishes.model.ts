import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {DishesModel} from "../dishes/dishes.model";
import {OrdersModel} from "../orders/orders.model";


@Table({
    tableName: "orders_dishes",
    createdAt: false,
    updatedAt: false,
})

export class OrdersDishesModel extends Model<OrdersDishesModel> {
    @ApiProperty({example: 1, description: "uniq id"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => DishesModel)
    @ApiProperty({example: 1, description: "dish id"})
    dishId: number;

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => OrdersModel)
    @ApiProperty({example: 1, description: "order id"})
    orderId: number;

    @Column({type: DataType.INTEGER})
    @ApiProperty({example: 1, description: "quantity of dishes"})
    quantity: number;
}
