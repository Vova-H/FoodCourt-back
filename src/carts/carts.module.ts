import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {CartsController} from "./carts.controller";
import {CartsService} from "./carts.service";
import {CartsModel} from "./carts.model";
import {JwtService} from "@nestjs/jwt";

@Module({
    controllers: [CartsController],
    providers: [CartsService, JwtService],
    imports: [
        SequelizeModule.forFeature([CartsModel]),
    ],
    exports: [
        CartsService
    ]
})
export class CartsModule {}
