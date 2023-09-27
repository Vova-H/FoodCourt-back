import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UsersModel} from "../users/users.model";
import {RolesModel} from "../roles/roles.model";


@Table({
    tableName: "users_roles",
    createdAt: false,
    updatedAt: false
})

export class UsersRolesModel extends Model<UsersRolesModel> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => UsersModel)
    userId: number;

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => RolesModel)
    roleId: number;
}
