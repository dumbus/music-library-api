import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'integer' })
  duration: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string;

  @Column({ type: 'uuid', nullable: true })
  albumId: string;
}
