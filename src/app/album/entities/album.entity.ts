import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'integer' })
  year: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string;
}
