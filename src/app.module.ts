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
import {AvatarsModule} from './avatars/avatars.module';
import {AvatarsController} from "./avatars/avatars.controller";
import {AvatarsModel} from "./avatars/avatarts.model";
import {FavoritesModel} from "./pivotTables/favorites.model";
import {OrdersController} from './orders/orders.controller';
import {OrdersModule} from './orders/orders.module';
import {OrdersModel} from "./orders/orders.model";
import {OrdersDishesModel} from "./pivotTables/Orders_Dishes.model";
import {CartsController} from './carts/carts.controller';
import {CartsModule} from './carts/carts.module';
import {CartsModel} from "./carts/carts.model";


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
            models: [UsersModel, RolesModel, UsersRolesModel, DishesModel, AvatarsModel, FavoritesModel, OrdersModel, OrdersDishesModel, CartsModel],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        DishesModule,
        AvatarsModule,
        OrdersModule,
        CartsModule,
    ],
    controllers: [DishesController, UsersController, AvatarsController, OrdersController, CartsController],
})

export class AppModule {

}



