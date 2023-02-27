import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { UserEntity } from './app/user/entities/user.entity';
import { ArtistEntity } from './app/artist/entities/artist.entity';
import { AlbumEntity } from './app/album/entities/album.entity';
import { TrackEntity } from './app/track/entities/track.entity';
import { FavoriteAlbumEntity } from './app/favorites/entities/favoriteAlbum.entity';
import { FavoriteArtistEntity } from './app/favorites/entities/favoriteArtist.entity';
import { FavoriteTrackEntity } from './app/favorites/entities/favoriteTrack.entity';

dotenv.config();

const {
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env;

export const typeormConfig = new DataSource({
  type: 'postgres',
  username: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  entities: [
    UserEntity,
    ArtistEntity,
    AlbumEntity,
    TrackEntity,
    FavoriteAlbumEntity,
    FavoriteArtistEntity,
    FavoriteTrackEntity,
  ],
  // synchronize: true,
  migrations: ['./**/migrations/*.js'],
  migrationsRun: true,
});
