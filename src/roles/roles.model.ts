import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UsersModel} from "../users/users.model";
import {UsersRolesModel} from "../pivotTables/users_roles.model";


interface RoleCreationAttrs {
    role: string,
}

@Table({
    tableName: "roles",
})
export class RolesModel extends Model<RolesModel, RoleCreationAttrs> {
    @ApiProperty({example: 1, description: "Uniq id"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ApiProperty({example: "ADMIN", description: "Roles"})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    role: string;

    @BelongsToMany(() => UsersModel, () => UsersRolesModel)
    users: UsersModel[]
}
