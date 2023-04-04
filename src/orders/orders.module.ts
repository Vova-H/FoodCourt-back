import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {OrdersController} from "./orders.controller";
import {OrdersService} from "./orders.service";
import {OrdersModel} from "./orders.model";
import {OrdersDishesModel} from "../pivotTables/Orders_Dishes.model";

@Module({
    controllers: [OrdersController],
    providers: [OrdersService],
    imports: [
        SequelizeModule.forFeature([OrdersModel, OrdersDishesModel]),
    ],
    exports: [
        OrdersService,
    ]
})
export class OrdersModule {}
