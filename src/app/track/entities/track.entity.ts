import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

import { ArtistEntity } from 'src/app/artist/entities/artist.entity';
import { AlbumEntity } from 'src/app/album/entities/album.entity';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'integer' })
  duration: number;

  @ManyToOne(() => ArtistEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  artist: Relation<ArtistEntity>;

  @Column({ type: 'uuid', nullable: true })
  artistId: ArtistEntity['id'] | null;

  @ManyToOne(() => AlbumEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  album: Relation<AlbumEntity>;

  @Column({ type: 'uuid', nullable: true })
  albumId: AlbumEntity['id'] | null;
}
