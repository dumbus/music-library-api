import {
  Injectable,
  Inject,
  forwardRef,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import { DbService } from '../../db/db.service';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    private db: DbService,

    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  getAll() {
    return this.db.albums;
  }

  getById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
    }

    const album = this.db.albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException('Album was not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  getIndexById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
    }

    const albumIndex = this.db.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      throw new HttpException('Album was not found', HttpStatus.NOT_FOUND);
    }

    return albumIndex;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const albumId = uuidv4();
    const album = { id: albumId, ...createAlbumDto };
    this.db.albums.push(album);

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { name, year, artistId } = updateAlbumDto;
    const album = this.getById(id);
    album.name = name;
    album.year = year;
    album.artistId = artistId;

    return album;
  }

  delete(id: string) {
    const albumIndex = this.getIndexById(id);
    this.db.albums.splice(albumIndex, 1);

    this.trackService.removeAlbum(id);
    this.favoritesService.removeAlbum(id, true);

    return null;
  }

  removeArtist(artistId: string) {
    const oldAlbums = this.getAll();

    const newAlbums = oldAlbums.map((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }

      return album;
    });

    this.db.albums = newAlbums;
  }
}
