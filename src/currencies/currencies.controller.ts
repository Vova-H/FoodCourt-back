import {Controller, Get} from '@nestjs/common';
import {CurrenciesService} from "./currencies.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";


@Controller('currencies')
export class CurrenciesController {
    constructor(private currenciesService: CurrenciesService) {
    }

    @Get()
    @ApiOperation({summary: "Getting currencies"})
    @ApiResponse({status: 200})
    async getAllDishes() {
        return this.currenciesService.getCurrency()
    }
}
