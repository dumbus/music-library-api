import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as yaml from 'js-yaml';
import { readFile } from 'fs/promises';

import { AppModule } from './app.module';

dotenv.config();

const PORT = Number(process.env.PORT || 4000);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const document = yaml.load(
    await readFile('./doc/api.yaml', { encoding: 'utf-8' }),
  );
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
}
bootstrap();
