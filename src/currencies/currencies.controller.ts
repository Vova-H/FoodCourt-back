import {Controller, Get} from '@nestjs/common';
import {CurrenciesService} from "./currencies.service";


@Controller('currencies')
export class CurrenciesController {
    constructor(private currenciesService: CurrenciesService) {
    }

    @Get()
    async getAllDishes() {
        return this.currenciesService.getCurrency()
    }
}
