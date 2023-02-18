import {
  Injectable,
  Inject,
  forwardRef,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import { DbService } from 'src/db/db.service';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    private db: DbService,

    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  async getAll() {
    try {
      return await this.db.albums.find();
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string) {
    try {
      if (!uuidValidate(id)) {
        throw new HttpException('Invalid album ID', HttpStatus.BAD_REQUEST);
      }

      const album = await this.db.albums.findOne({ where: { id } });

      if (!album) {
        throw new HttpException('Album was not found', HttpStatus.NOT_FOUND);
      }

      return album;
    } catch (error) {
      throw error;
    }
  }

  async create(createAlbumDto: CreateAlbumDto) {
    try {
      const albumId = uuidv4();
      const album = { id: albumId, ...createAlbumDto };
      await this.db.albums.save(album);

      return album;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      const { name, year, artistId } = updateAlbumDto;
      const album = await this.getById(id);
      album.name = name;
      album.year = year;
      album.artistId = artistId;

      await this.db.albums.save(album);

      return album;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.getById(id);
      const deletionResult = await this.db.albums.delete(id);

      if (deletionResult) {
        return null;
      } else {
        throw new HttpException('Artist was not found', HttpStatus.NOT_FOUND);
      }

      // this.favoritesService.removeAlbum(id, true);
    } catch (error) {
      throw error;
    }
  }
}
