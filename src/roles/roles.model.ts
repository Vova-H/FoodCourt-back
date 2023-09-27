import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {UsersModel} from "../users/users.model";
import {UsersRolesModel} from "../pivotTables/users_roles.model";


interface RoleCreationAttrs {
    role: string,
}

@Table({
    tableName: "roles",
})
export class RolesModel extends Model<RolesModel, RoleCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    role: string;

    @BelongsToMany(() => UsersModel, () => UsersRolesModel)
    users: UsersModel[]
}
