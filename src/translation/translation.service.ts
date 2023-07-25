import {Injectable} from '@nestjs/common';
import {Translate} from "@google-cloud/translate/build/src/v2";
import * as path from "path";


@Injectable()
export class TranslationService {
    translateClient: Translate;

    constructor() {
        this.translateClient = new Translate({
            keyFilename: path.join(__dirname, "../../foodCourt.json")
        });
    }

    async translateText(text: string, targetLanguage: string): Promise<string> {
        const [translation] = await this.translateClient.translate(text, targetLanguage);
        return translation;
    }
}
