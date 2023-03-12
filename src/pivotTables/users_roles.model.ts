import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UsersModel} from "../users/users.model";
import {RolesModel} from "../roles/roles.model";


@Table({
    tableName: "users_roles",
    createdAt: false,
    updatedAt: false
})

export class UsersRolesModel extends Model<UsersRolesModel> {
    @ApiProperty({example: 1, description: "uniq id"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.INTEGER})
    @ForeignKey(() => UsersModel)
    @ApiProperty({example: 1, description: "user id"})
    userId: number;
    @Column({type: DataType.INTEGER})
    @ForeignKey(() => RolesModel)
    @ApiProperty({example: 1, description: "role id"})
    roleId: number;
}
