import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UsersRolesModel} from "../pivotTables/users_roles.model";
import {RolesModel} from "../roles/roles.model";


interface UserCreationAttrs {
    username: string
    email: string
    password: string
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
    @ApiProperty({example: "11111111", description: "password"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;


    @BelongsToMany(() => RolesModel, () => UsersRolesModel)
    roles: RolesModel[]
}
