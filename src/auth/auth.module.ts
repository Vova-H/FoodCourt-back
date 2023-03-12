import {forwardRef, Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {UsersModel} from "../users/users.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {RolesModule} from "../roles/roles.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            secret: process.env.PRIVATE_kEY || "SECRET_KEY",
            signOptions: {
                expiresIn: "12h"
            }
        }),
        SequelizeModule.forFeature([UsersModel]),
        RolesModule
    ],
    exports: [
        AuthService, JwtModule
    ]
})

export class AuthModule {
}
