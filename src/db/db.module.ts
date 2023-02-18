import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumEntity } from 'src/app/album/entities/album.entity';
import { ArtistEntity } from 'src/app/artist/entities/artist.entity';
import { TrackEntity } from 'src/app/track/entities/track.entity';
import { UserEntity } from 'src/app/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlbumEntity,
      ArtistEntity,
      TrackEntity,
      UserEntity,
    ]),
  ],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
