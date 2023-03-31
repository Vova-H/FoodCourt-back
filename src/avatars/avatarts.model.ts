import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UsersModel} from "../users/users.model";
import {IsOptional} from "class-validator";


interface AvatarCreationAttrs {
    value: string
    userId: number
}

@Table({
    tableName: "avatars"
})
export class AvatarsModel extends Model<AvatarsModel, AvatarCreationAttrs> {
    @ApiProperty({example: 1, description: "uniq id"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ForeignKey(() => UsersModel)
    @Column
    userId: number;

    @ApiProperty({example: "avatar", description: "user avatar"})
    @Column({type: DataType.BLOB, allowNull: false})
    value: Uint8Array;

    @BelongsTo(() => UsersModel)
    user: UsersModel
}
