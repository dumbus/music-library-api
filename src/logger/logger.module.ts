import { Module } from '@nestjs/common';

import { CustomLoggerService } from './logger.service';
import { CustomLoggerMiddleware } from './logger.middleware';

@Module({
  providers: [CustomLoggerService, CustomLoggerMiddleware],
  exports: [CustomLoggerService, CustomLoggerMiddleware],
})
export class LoggerModule {}