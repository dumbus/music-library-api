import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { CustomLoggerService } from './logger.service';

@Injectable()
export class CustomLoggerMiddleware implements NestMiddleware {
    constructor(private logger: CustomLoggerService) {}

    use(req: Request, res: Response, next: NextFunction) {
        next();

        const { url, query, body } = req;
        const { statusCode } = res;
        const stringifiedQuery = JSON.stringify(query);
        const stringifiedBody = JSON.stringify(body);

        const logMessage = `url: ${url}, query: ${stringifiedQuery}, body: ${stringifiedBody}, statusCode: ${statusCode}`;

        if (statusCode >= 500 && statusCode <= 599) {
            this.logger.error(logMessage);
        }

        if (statusCode >= 400 && statusCode <= 499) {
            this.logger.warn(logMessage);
        }

        this.logger.log(logMessage);
    }
}
