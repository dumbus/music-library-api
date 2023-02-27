import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

import { ArtistEntity } from 'src/app/artist/entities/artist.entity';

@Entity('favoriteArtist')
export class FavoriteArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @OneToOne(() => ArtistEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  artist: Relation<ArtistEntity>;

  @Column({ type: 'uuid' })
  artistId: ArtistEntity['id'] | null;
}
