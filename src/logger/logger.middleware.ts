import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { CustomLoggerService } from './logger.service';

@Injectable()
export class CustomLoggerMiddleware implements NestMiddleware {
  constructor(private logger: CustomLoggerService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, query, body, method, headers } = req;
    const stringifiedQuery = JSON.stringify(query);
    const stringifiedBody = JSON.stringify(body);
    const authHeaders = headers['authorization'] || 'no auth headers set';
    const userAgentHeaders =
      headers['user-agent'] || 'no user-agent headers set';

    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks = [];

    res.write = (...restArgs: any[]) => {
      chunks.push(Buffer.from(restArgs[0]));
      return oldWrite.apply(res, restArgs);
    };

    res.end = (...restArgs: any[]) => {
      if (restArgs[0]) {
        chunks.push(Buffer.from(restArgs[0]));
      }

      return oldEnd.apply(res, restArgs);
    };

    const requestDebugMessage = `${method} request was sent to server, url: ${originalUrl}, query: ${stringifiedQuery}, body: ${stringifiedBody}, auth headers: ${authHeaders},  user-agent headers: ${userAgentHeaders}`;
    await this.logger.debug(requestDebugMessage);

    const requestLogMessage = `Request - method: ${method}, url: ${originalUrl}, query: ${stringifiedQuery}, body: ${stringifiedBody}`;
    await this.logger.log(requestLogMessage);

    res.on('finish', async () => {
      const { statusCode } = res;

      const responseBody = Buffer.concat(chunks).toString('utf8');
      const responseLogMessage = `Response - statusCode: ${statusCode}, body: ${responseBody}`;
      await this.logger.log(responseLogMessage);

      const responseDebugMessage = `Server responded with statusCode ${statusCode}, body: ${responseBody}`;
      await this.logger.debug(responseDebugMessage);
    });

    next();
  }
}
