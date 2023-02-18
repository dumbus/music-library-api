import {
  Injectable,
  Inject,
  forwardRef,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';

import { DbService } from '../../db/db.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavoritesService {
  constructor(
    private db: DbService,

    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  // getAll() {
  //   const favoriteArtists = this.db.artists.filter((artist) => {
  //     const id = artist.id;

  //     return this.db.favorites.artists.includes(id);
  //   });

  //   const favoriteAlbums = this.db.albums.filter((album) => {
  //     const id = album.id;

  //     return this.db.favorites.albums.includes(id);
  //   });

  //   const favoriteTracks = this.db.tracks.filter((track) => {
  //     const id = track.id;

  //     return this.db.favorites.tracks.includes(id);
  //   });

  //   return {
  //     artists: favoriteArtists,
  //     albums: favoriteAlbums,
  //     tracks: favoriteTracks,
  //   };
  // }

  // addArtist(id: string) {
  //   try {
  //     const artist = this.artistService.getById(id);
  //     const artistId = artist.id;
  //     this.db.favorites.artists.push(artistId);

  //     return { message: 'Artist was successfully added to Favorites' };
  //   } catch (error) {
  //     switch (error.status) {
  //       case 400:
  //         throw new HttpException('Invalid artist ID', HttpStatus.BAD_REQUEST);
  //       case 404:
  //         throw new HttpException(
  //           'Artist does not exist',
  //           HttpStatus.UNPROCESSABLE_ENTITY,
  //         );
  //     }
  //   }
  // }

  // addAlbum(id: string) {
  //   try {
  //     const album = this.albumService.getById(id);
  //     const albumId = album.id;
  //     this.db.favorites.albums.push(albumId);

  //     return { message: 'Album was successfully added to Favorites' };
  //   } catch (error) {
  //     switch (error.status) {
  //       case 400:
  //         throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
  //       case 404:
  //         throw new HttpException(
  //           'Album does not exist',
  //           HttpStatus.UNPROCESSABLE_ENTITY,
  //         );
  //     }
  //   }
  // }

  // addTrack(id: string) {
  //   try {
  //     const track = this.trackService.getById(id);
  //     const trackId = track.id;
  //     this.db.favorites.tracks.push(trackId);

  //     return { message: 'Track was successfully added to Favorites' };
  //   } catch (error) {
  //     switch (error.status) {
  //       case 400:
  //         throw new HttpException('Invalid track ID', HttpStatus.BAD_REQUEST);
  //       case 404:
  //         throw new HttpException(
  //           'Track does not exist',
  //           HttpStatus.UNPROCESSABLE_ENTITY,
  //         );
  //     }
  //   }
  // }

  // removeArtist(id: string, isDeleted = false) {
  //   if (!uuidValidate(id)) {
  //     throw new HttpException('Invalid artist ID', HttpStatus.BAD_REQUEST);
  //   }

  //   const artistIndex = this.db.favorites.artists.findIndex(
  //     (artistId) => artistId === id,
  //   );

  //   if (!artistIndex && !isDeleted) {
  //     throw new HttpException(
  //       'Artist is not in Favorites',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   } else if (artistIndex >= 0) {
  //     this.db.favorites.artists.splice(artistIndex, 1);
  //   }

  //   return null;
  // }

  // removeAlbum(id: string, isDeleted = false) {
  //   if (!uuidValidate(id)) {
  //     throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
  //   }

  //   const albumIndex = this.db.favorites.albums.findIndex(
  //     (albumId) => albumId === id,
  //   );

  //   if (!albumIndex && !isDeleted) {
  //     throw new HttpException(
  //       'Album is not in Favorites',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   } else if (albumIndex >= 0) {
  //     this.db.favorites.albums.splice(albumIndex, 1);
  //   }

  //   return null;
  // }

  // removeTrack(id: string, isDeleted = false) {
  //   if (!uuidValidate(id)) {
  //     throw new HttpException('Invalid track ID', HttpStatus.BAD_REQUEST);
  //   }

  //   const trackIndex = this.db.favorites.tracks.findIndex(
  //     (trackId) => trackId === id,
  //   );

  //   if (!trackIndex && !isDeleted) {
  //     throw new HttpException(
  //       'Track is not in Favorites',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   } else if (trackIndex >= 0) {
  //     this.db.favorites.tracks.splice(trackIndex, 1);
  //   }

  //   return null;
  // }
}
