import { Module } from '@nestjs/common';

import { DbModule } from 'src/db/db.module';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  imports: [DbModule],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
