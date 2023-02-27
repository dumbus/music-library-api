import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

import { AlbumEntity } from 'src/app/album/entities/album.entity';

@Entity('favoriteAlbum')
export class FavoriteAlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @ManyToOne(() => AlbumEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  album: Relation<AlbumEntity>;

  @Column({ type: 'uuid', nullable: true })
  albumId: AlbumEntity['id'] | null;
}
