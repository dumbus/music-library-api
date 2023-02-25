import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { CustomLoggerService } from './logger.service';

@Injectable()
export class CustomLoggerMiddleware implements NestMiddleware {
  constructor(private logger: CustomLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, query, body, method } = req;
    const stringifiedQuery = JSON.stringify(query);
    const stringifiedBody = JSON.stringify(body);

    const requestDebugMessage = `${method} request was sent to server, url: ${originalUrl}, query: ${stringifiedQuery}, body: ${stringifiedBody}`;
    this.logger.debug(requestDebugMessage);

    const requestLogMessage = `Request - method: ${method}, url: ${originalUrl}, query: ${stringifiedQuery}, body: ${stringifiedBody}`;
    this.logger.log(requestLogMessage);

    res.on('finish', () => {
      const { statusCode } = res;

      const responseLogMessage = `Response - statusCode: ${statusCode}`;
      this.logger.log(responseLogMessage);

      const responseDebugMessage = `Server responded with statusCode ${statusCode}`;
      this.logger.debug(responseDebugMessage);
    });

    next();
  }
}
