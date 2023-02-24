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

    const message =
      exception instanceof HttpException
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
      this.logger.error(
        `statusCode: ${responseBody.statusCode}, message: ${responseBody.message}`,
      );
    }

    if (responseBody.statusCode >= 400 && responseBody.statusCode <= 499) {
      this.logger.warn(
        `statusCode: ${responseBody.statusCode}, message: ${responseBody.message}`,
      );
    }
  }
}
