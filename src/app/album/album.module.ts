import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumEntity } from './entities/album.entity';
import { TrackModule } from '../track/track.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    forwardRef(() => TrackModule),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
