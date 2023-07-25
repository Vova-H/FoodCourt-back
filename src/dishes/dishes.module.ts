import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {DishesController} from "./dishes.controller";
import {DishesService} from './dishes.service';
import {DishesModel} from "./dishes.model";
import {TranslationService} from "../translation/translation.service";
import {JwtService} from "@nestjs/jwt";


@Module({
    controllers: [DishesController],
    providers: [DishesService, TranslationService, JwtService],
    imports: [
        SequelizeModule.forFeature([DishesModel]),
    ],
    exports: [
        DishesService
    ]
})
export class DishesModule {
}
