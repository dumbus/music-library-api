import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { CustomLoggerService } from './logger.service';

@Injectable()
export class CustomLoggerMiddleware implements NestMiddleware {
  constructor(private logger: CustomLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { url, query, body, method } = req;
      const { statusCode } = res;
      const stringifiedQuery = JSON.stringify(query);
      const stringifiedBody = JSON.stringify(body);

      const logMessage = `${method} url: ${url}, query: ${stringifiedQuery}, body: ${stringifiedBody}, statusCode: ${statusCode}`;

      this.logger.log(logMessage);
    });

    next();
  }
}
