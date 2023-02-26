import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { CustomLoggerService } from './logger.service';

@Catch()
export class CustomExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const isHttpException = exception instanceof HttpException;

    const message = isHttpException
      ? exception.message
      : 'INTERNAL SERVER ERROR';

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      method: httpAdapter.getRequestMethod(ctx.getRequest()),
      message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

    if (responseBody.statusCode >= 500 && responseBody.statusCode <= 599) {
      const errorMessage = `statusCode: ${responseBody.statusCode}, message: ${responseBody.message}`;
      this.logger.error(errorMessage);
    }

    if (responseBody.statusCode >= 400 && responseBody.statusCode <= 499) {
      const warnMessage = `statusCode: ${responseBody.statusCode}, message: ${responseBody.message}`;
      this.logger.warn(warnMessage);
    }

    const exceptionStringified = JSON.stringify(exception);
    const debugMessage = `An error occurred: statusCode: Error: ${exceptionStringified}`;
    this.logger.debug(debugMessage);
  }
}
