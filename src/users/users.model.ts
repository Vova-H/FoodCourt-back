import {BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UsersRolesModel} from "../pivotTables/users_roles.model";
import {RolesModel} from "../roles/roles.model";
import {AvatarsModel} from "../avatars/avatarts.model";
import {DishesModel} from "../dishes/dishes.model";
import {FavoritesModel} from "../pivotTables/favorites.model";
import {OrdersModel} from "../orders/orders.model";
import {CartsModel} from "../carts/carts.model";


interface UserCreationAttrs {
    username: string
    email: string
    password: string,
    discount_is_using: boolean
}

@Table({
    tableName: "users"
})
export class UsersModel extends Model<UsersModel, UserCreationAttrs> {
    @ApiProperty({example: 1, description: "uniq id"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ApiProperty({example: "username", description: "username"})
    @Column({type: DataType.STRING, allowNull: false})
    username: string;
    @ApiProperty({example: "example@gmail.com", description: "uniq email"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    @ApiProperty({example: true, description: 'Indicates whether the discount is being used or not', type: Boolean})
    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    discount_is_using: boolean;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @BelongsToMany(() => RolesModel, () => UsersRolesModel)
    roles: RolesModel[]

    @HasOne(() => AvatarsModel)
    avatar: AvatarsModel

    @BelongsToMany(() => DishesModel, () => FavoritesModel)
    favorites: DishesModel[]

    @HasMany(() => OrdersModel)
    orders: OrdersModel[]

    @HasMany(() => CartsModel)
    cartItems: CartsModel[]
}
