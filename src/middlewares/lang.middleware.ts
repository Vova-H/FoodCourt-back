import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CustomLangMiddleware  implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        if (req.query.lang === 'ua') {
            req.query.lang = 'uk';
        }
        next();
    }
}
