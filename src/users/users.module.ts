import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModel} from "./users.model";
import {BelongsToMany} from "sequelize-typescript";
import {RolesModel} from "../roles/roles.model";
import {UsersRolesModel} from "../pivotTables/users_roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {AvatarsModel} from "../avatars/avatarts.model";
import {AvatarsModule} from "../avatars/avatars.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([UsersModel, RolesModel, UsersRolesModel, AvatarsModel]),
        RolesModule, forwardRef(() => AuthModule),
        AvatarsModule
    ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {

    @BelongsToMany(() => RolesModel, () => UsersRolesModel)
    roles: RolesModel[]

}
