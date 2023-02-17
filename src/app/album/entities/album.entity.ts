import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

import { ArtistEntity } from 'src/app/artist/entities/artist.entity';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'integer' })
  year: number;

  @ManyToOne(() => ArtistEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  artist: Relation<ArtistEntity>;

  @Column({ type: 'uuid', nullable: true })
  artistId: ArtistEntity['id'] | null;
}
