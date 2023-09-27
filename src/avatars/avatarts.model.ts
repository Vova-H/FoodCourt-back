import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UsersModel} from "../users/users.model";


interface AvatarCreationAttrs {
    value: string
    userId: number
}

@Table({
    tableName: "avatars"
})
export class AvatarsModel extends Model<AvatarsModel, AvatarCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ForeignKey(() => UsersModel)
    @Column
    userId: number;

    @Column({type: DataType.BLOB, allowNull: false})
    value: Uint8Array;

    @BelongsTo(() => UsersModel)
    user: UsersModel
}
