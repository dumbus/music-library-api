import { Module } from '@nestjs/common';

import { DbModule } from 'src/db/db.module';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';

@Module({
  imports: [DbModule],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
