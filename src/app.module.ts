import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './app/artist/artist.module';
import { AlbumModule } from './app/album/album.module';
import { DbModule } from './db/db.module';
import { UserModule } from './app/user/user.module';
import { TrackModule } from './app/track/track.module';
import { FavoritesModule } from './app/favorites/favorites.module';

import { UserEntity } from './app/user/entities/user.entity';
import { ArtistEntity } from './app/artist/entities/artist.entity';
import { AlbumEntity } from './app/album/entities/album.entity';
import { TrackEntity } from './app/track/entities/track.entity';

dotenv.config();

const {
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env;

@Module({
  imports: [
    DbModule,
    ArtistModule,
    AlbumModule,
    UserModule,
    TrackModule,
    FavoritesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: POSTGRES_USERNAME,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DATABASE,
      host: POSTGRES_HOST,
      port: Number(POSTGRES_PORT),
      entities: [UserEntity, ArtistEntity, AlbumEntity, TrackEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
