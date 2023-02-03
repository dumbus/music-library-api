import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  getAll() {
    return this.albums;
  }

  getById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
    }

    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException('Album was not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  getIndexById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
    }

    const albumIndex = this.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      throw new HttpException('Album was not found', HttpStatus.NOT_FOUND);
    }

    return albumIndex;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const albumId = uuidv4();
    const album = { id: albumId, ...createAlbumDto };
    this.albums.push(album);

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
    this.albums.splice(albumIndex, 1);

    return null;
  }
}
