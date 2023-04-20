import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {CartsController} from "./carts.controller";
import {CartsService} from "./carts.service";
import {CartsModel} from "./carts.model";

@Module({
    controllers: [CartsController],
    providers: [CartsService],
    imports: [
        SequelizeModule.forFeature([CartsModel]),
    ],
    exports: [
        CartsService
    ]
})
export class CartsModule {}
