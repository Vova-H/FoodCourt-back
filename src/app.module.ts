import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from './users/users.module';
import * as process from "process";
import {UsersModel} from "./users/users.model";
import {RolesModule} from './roles/roles.module';
import {RolesModel} from "./roles/roles.model";
import {UsersRolesModel} from "./pivotTables/users_roles.model";
import {AuthModule} from './auth/auth.module';
import {DishesController} from './dishes/dishes.controller';
import {DishesModule} from './dishes/dishes.module';
import {DishesModel} from "./dishes/dishes.model";
import {UsersController} from "./users/users.controller";
import { AvatarsModule } from './avatars/avatars.module';
import {AvatarsController} from "./avatars/avatars.controller";
import {AvatarsModel} from "./avatars/avatarts.model";
import {FavoritesModel} from "./pivotTables/favorites.model";



@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [UsersModel, RolesModel, UsersRolesModel, DishesModel, AvatarsModel, FavoritesModel],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        DishesModule,
        AvatarsModule,
    ],
    controllers: [DishesController, UsersController, AvatarsController],
})

export class AppModule {

}



