import { Module, forwardRef } from '@nestjs/common';

import { DbModule } from 'src/db/db.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  imports: [DbModule, forwardRef(() => FavoritesModule)],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
