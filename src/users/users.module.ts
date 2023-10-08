import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModel} from "./users.model";
import {RolesModel} from "../roles/roles.model";
import {UsersRolesModel} from "../pivotTables/users_roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {AvatarsModel} from "../avatars/avatarts.model";
import {AvatarsModule} from "../avatars/avatars.module";
import {TranslationService} from "../translation/translation.service";

@Module({
    controllers: [UsersController],
    providers: [UsersService, TranslationService],
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
}
