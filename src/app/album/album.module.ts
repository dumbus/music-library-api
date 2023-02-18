import { Module, forwardRef } from '@nestjs/common';

import { DbModule } from 'src/db/db.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [DbModule, forwardRef(() => FavoritesModule)],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
