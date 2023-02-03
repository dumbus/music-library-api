import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
