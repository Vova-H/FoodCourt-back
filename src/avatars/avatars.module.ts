import {Module} from '@nestjs/common';
import {AvatarsController} from './avatars.controller';
import {AvatarsService} from './avatars.service';
import {AvatarsModel} from "./avatarts.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModel} from "../users/users.model";
import {JwtService} from "@nestjs/jwt";


@Module({
    controllers: [AvatarsController],
    providers: [AvatarsService, JwtService],
    imports: [
        SequelizeModule.forFeature([UsersModel, AvatarsModel]),
    ],
    exports: [AvatarsService]
})
export class AvatarsModule {
}
