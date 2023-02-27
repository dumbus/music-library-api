import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import { DbService } from '../../db/db.service';
import { FavoriteAlbumEntity } from './entities/favoriteAlbum.entity';
import { FavoriteArtistEntity } from './entities/favoriteArtist.entity';
import { FavoriteTrackEntity } from './entities/favoriteTrack.entity';

@Injectable()
export class FavoritesService {
  constructor(private db: DbService) {}

  async getAll() {
    const favoriteArtists = await this.db.favoriteArtists.find();
    const artists = favoriteArtists.map((favoriteArtist) => {
      return favoriteArtist.artist;
    });

    const favoriteAlbums = await this.db.favoriteAlbums.find();
    const albums = favoriteAlbums.map((favoriteAlbum) => {
      return favoriteAlbum.album;
    });

    const favoriteTracks = await this.db.favoriteTracks.find();
    const tracks = favoriteTracks.map((favoriteTrack) => {
      return favoriteTrack.track;
    });

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid artist ID', HttpStatus.BAD_REQUEST);
    }

    const artist = await this.db.artists.findOne({ where: { id } });

    if (!artist) {
      throw new HttpException(
        'Artist does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const artistId = artist.id;

    const favoriteArtistId = uuidv4();
    const favoriteArtist: FavoriteArtistEntity = {
      id: favoriteArtistId,
      artistId,
      artist,
    };
    await this.db.favoriteArtists.save(favoriteArtist);

    return { message: 'Artist was successfully added to Favorites' };
  }

  async addAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
    }

    const album = await this.db.albums.findOne({ where: { id } });

    if (!album) {
      throw new HttpException(
        'Album does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const albumId = album.id;

    const favoriteAlbumsId = uuidv4();
    const favoriteAlbum: FavoriteAlbumEntity = {
      id: favoriteAlbumsId,
      albumId,
      album,
    };

    await this.db.favoriteAlbums.save(favoriteAlbum);

    return { message: 'Album was successfully added to Favorites' };
  }

  async addTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid track ID', HttpStatus.BAD_REQUEST);
    }

    const track = await this.db.tracks.findOne({ where: { id } });

    if (!track) {
      throw new HttpException(
        'Track does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const trackId = track.id;

    const favoriteTracksId = uuidv4();
    const favoriteTrack: FavoriteTrackEntity = {
      id: favoriteTracksId,
      trackId,
      track,
    };
    await this.db.favoriteTracks.save(favoriteTrack);

    return { message: 'Track was successfully added to Favorites' };
  }

  async removeArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid artist ID', HttpStatus.BAD_REQUEST);
    }

    const artist = await this.db.artists.findOne({ where: { id } });

    if (!artist) {
      throw new HttpException(
        'Artist does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const artistInFavorites = await this.db.favoriteArtists.findOne({
      where: { artistId: id },
    });

    if (!artistInFavorites) {
      throw new HttpException(
        'Artist is not in Favorites',
        HttpStatus.NOT_FOUND,
      );
    } else {
      this.db.favoriteArtists.delete({ artistId: id });
    }

    return null;
  }

  async removeAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
    }

    const album = await this.db.albums.findOne({ where: { id } });

    if (!album) {
      throw new HttpException(
        'Album does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const albumInFavorites = await this.db.favoriteAlbums.findOne({
      where: { albumId: id },
    });

    if (!albumInFavorites) {
      throw new HttpException(
        'Album is not in Favorites',
        HttpStatus.NOT_FOUND,
      );
    } else {
      this.db.favoriteAlbums.delete({ albumId: id });
    }

    return null;
  }

  async removeTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid track ID', HttpStatus.BAD_REQUEST);
    }

    const track = await this.db.tracks.findOne({ where: { id } });

    if (!track) {
      throw new HttpException(
        'Track does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const trackInFavorites = await this.db.favoriteTracks.findOne({
      where: { trackId: id },
    });

    if (!trackInFavorites) {
      throw new HttpException(
        'Track is not in Favorites',
        HttpStatus.NOT_FOUND,
      );
    } else {
      this.db.favoriteTracks.delete({ trackId: id });
    }

    return null;
  }
}
