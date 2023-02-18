import { Module, forwardRef } from '@nestjs/common';

import { DbModule } from 'src/db/db.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';

@Module({
  imports: [DbModule, forwardRef(() => FavoritesModule)],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
