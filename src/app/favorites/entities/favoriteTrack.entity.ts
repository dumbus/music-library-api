import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

import { TrackEntity } from 'src/app/track/entities/track.entity';

@Entity('favoriteTrack')
export class FavoriteTrackEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @OneToOne(() => TrackEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  track: Relation<TrackEntity>;

  @Column({ type: 'uuid' })
  trackId: TrackEntity['id'] | null;
}
