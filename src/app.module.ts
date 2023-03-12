import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersController} from './users/users.controller';
import {UsersService} from './users/users.service';
import {ConfigModule} from "@nestjs/config";
import { UsersModule } from './users/users.module';
import * as process from "process";
import {UsersModel} from "./users/users.model";
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import {RolesModel} from "./roles/roles.model";
import {UsersRolesModel} from "./pivotTables/users_roles.model";
import { AuthModule } from './auth/auth.module';


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
            models: [UsersModel, RolesModel, UsersRolesModel],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
    ],
})

export class AppModule {

}



