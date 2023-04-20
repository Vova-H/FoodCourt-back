import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {DishesModel} from "../dishes/dishes.model";
import {OrdersDishesModel} from "../pivotTables/Orders_Dishes.model";
import {UsersModel} from "../users/users.model";


interface OrdersCreationAttrs {
    status: boolean
    date: string
    time: string
    clientId: number
}

@Table({
    tableName: "orders"
})
export class OrdersModel extends Model<OrdersModel, OrdersCreationAttrs> {
    @ApiProperty({example: 1, description: "uniq id"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "status", description: "status of order"})
    @Column({type: DataType.BOOLEAN, allowNull: false})
    status: boolean;

    @ApiProperty({example: "01.01.2000", description: "date of order"})
    @Column({type: DataType.DATEONLY, unique: false, allowNull: false})
    date: string;

    @ApiProperty({example: "10:00", description: "time of order"})
    @Column({type: DataType.TIME, allowNull: false})
    time: string;

    @ForeignKey(() => UsersModel)
    clientId: number

    @BelongsToMany(() => DishesModel, () => OrdersDishesModel)
    dishes: DishesModel[]

    @BelongsTo(() => UsersModel)
    client: UsersModel

}

