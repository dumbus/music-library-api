import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as yaml from 'js-yaml';
import { readFile } from 'fs/promises';

import { AppModule } from './app.module';
import { CustomLoggerService } from './logger/logger.service';

dotenv.config();

const PORT = Number(process.env.PORT || 4000);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const document = yaml.load(
    await readFile('./doc/api.yaml', { encoding: 'utf-8' }),
  );
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);

  process.on('uncaughtException', (error) => {
    app.get(CustomLoggerService).error(`Unhandled Exception: ${error}`);
  });

  process.on('unhandledRejection', (error) => {
    app.get(CustomLoggerService).error(`Unhandled Rejection: ${error}`);
  });
}
bootstrap();
