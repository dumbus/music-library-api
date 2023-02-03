import { Module, forwardRef } from '@nestjs/common';

import { DbModule } from 'src/db/db.module';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  imports: [DbModule, forwardRef(() => AlbumModule), forwardRef(() => TrackModule)],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
