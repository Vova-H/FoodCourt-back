import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {CartsController} from "./carts.controller";
import {CartsService} from "./carts.service";
import {CartsModel} from "./carts.model";
import {JwtService} from "@nestjs/jwt";
import {TranslationService} from "../translation/translation.service";

@Module({
    controllers: [CartsController],
    providers: [CartsService, JwtService, TranslationService],
    imports: [
        SequelizeModule.forFeature([CartsModel]),
    ],
    exports: [
        CartsService
    ]
})
export class CartsModule {}
