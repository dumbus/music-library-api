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
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    private db: DbService,

    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  async getAll() {
    try {
      return await this.db.artists.find();
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string) {
    try {
      if (!uuidValidate(id)) {
        throw new HttpException('Invalid artist ID', HttpStatus.BAD_REQUEST);
      }

      const artist = await this.db.artists.findOne({ where: { id } });

      if (!artist) {
        throw new HttpException('Artist was not found', HttpStatus.NOT_FOUND);
      }

      return artist;
    } catch (error) {
      throw error;
    }
  }

  async create(createArtistDto: CreateArtistDto) {
    try {
      const artistId = uuidv4();
      const artist = { id: artistId, ...createArtistDto };
      await this.db.artists.save(artist);

      return artist;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      const { name, grammy } = updateArtistDto;
      const artist = await this.getById(id);
      artist.name = name;
      artist.grammy = grammy;

      await this.db.artists.save(artist);

      return artist;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.getById(id);
      const deletionResult = await this.db.artists.delete(id);

      if (deletionResult) {
        return null;
      } else {
        throw new HttpException('Artist was not found', HttpStatus.NOT_FOUND);
      }

      // this.favoritesService.removeArtist(id, true);
    } catch (error) {
      throw error;
    }
  }
}
