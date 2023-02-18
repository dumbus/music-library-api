import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeormConfig } from './typeorm.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './app/artist/artist.module';
import { AlbumModule } from './app/album/album.module';
import { DbModule } from './db/db.module';
import { UserModule } from './app/user/user.module';
import { TrackModule } from './app/track/track.module';
import { FavoritesModule } from './app/favorites/favorites.module';

@Module({
  imports: [
    DbModule,
    ArtistModule,
    AlbumModule,
    UserModule,
    TrackModule,
    FavoritesModule,
    TypeOrmModule.forRoot(typeormConfig.options),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
