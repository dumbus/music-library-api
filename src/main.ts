import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
// import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as yaml from 'js-yaml';
import { readFile } from 'fs/promises';

import { AppModule } from './app.module';
import { CustomLoggerService } from './logger/logger.service';

dotenv.config();

const PORT = Number(process.env.PORT || 4000);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const document = yaml.load(
    await readFile('./doc/api.yaml', { encoding: 'utf-8' }),
  );
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);

  const serverStartMessage = `Server started at: localhost:${PORT}`;
  const openApiStartMessage = `OpenAPI documentation is available at: localhost:${PORT}/doc`;

  console.log(serverStartMessage);
  console.log(openApiStartMessage);

  await app.get(CustomLoggerService).debug(serverStartMessage);
  await app.get(CustomLoggerService).debug(openApiStartMessage);

  process.on('uncaughtException', async (error) => {
    await app.get(CustomLoggerService).error(`Unhandled Exception: ${error}`);
  });

  process.on('unhandledRejection', async (error) => {
    await app.get(CustomLoggerService).error(`Unhandled Rejection: ${error}`);
  });
}
bootstrap();
