import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

import { typeormConfig } from './typeorm.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './app/artist/artist.module';
import { AlbumModule } from './app/album/album.module';
import { DbModule } from './db/db.module';
import { UserModule } from './app/user/user.module';
import { TrackModule } from './app/track/track.module';
import { FavoritesModule } from './app/favorites/favorites.module';
import { LoggerModule } from './logger/logger.module';
import { CustomLoggerMiddleware } from './logger/logger.middleware';
import { CustomExceptionsFilter } from './logger/exception.filter';

@Module({
  imports: [
    DbModule,
    ArtistModule,
    AlbumModule,
    UserModule,
    TrackModule,
    FavoritesModule,
    LoggerModule,
    TypeOrmModule.forRoot(typeormConfig.options),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: CustomExceptionsFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomLoggerMiddleware).forRoutes('*');
  }
}
