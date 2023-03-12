import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {RolesController} from "./roles.controller";
import {RolesService} from "./roles.service";
import {RolesModel} from "./roles.model";
import {UsersModel} from "../users/users.model";
import {UsersRolesModel} from "../pivotTables/users_roles.model";

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    imports: [
        SequelizeModule.forFeature([RolesModel, UsersModel, UsersRolesModel])
    ],
    exports: [RolesService]
})
export class RolesModule {
}
