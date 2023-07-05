import axios from "axios";
import * as process from "process";


export class CurrenciesService {
    URL = "http://api.currencylayer.com"
    API_KEY = process.env.CURRENCY_API_KEY

    async getCurrency() {
        const response = await axios.get(`${this.URL}/live?access_key=${this.API_KEY}&source=USD&currencies=PLN,UAH&format=1`)
        return response.data.quotes
    }
}
