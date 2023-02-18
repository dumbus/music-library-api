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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(
    private db: DbService,

    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  async getAll() {
    try {
      return await this.db.tracks.find();
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string) {
    try {
      if (!uuidValidate(id)) {
        throw new HttpException('Invalid track ID', HttpStatus.BAD_REQUEST);
      }

      const track = await this.db.tracks.findOne({ where: { id } });

      if (!track) {
        throw new HttpException('Track was not found', HttpStatus.NOT_FOUND);
      }

      return track;
    } catch (error) {
      throw error;
    }
  }

  async create(createTrackDto: CreateTrackDto) {
    try {
      const trackId = uuidv4();
      const track = { id: trackId, ...createTrackDto };
      await this.db.tracks.save(track);

      return track;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      const { name, duration, artistId, albumId } = updateTrackDto;
      const track = await this.getById(id);
      track.name = name;
      track.duration = duration;
      track.artistId = artistId;
      track.albumId = albumId;

      await this.db.tracks.save(track);

      return track;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.getById(id);
      const deletionResult = await this.db.tracks.delete(id);

      if (deletionResult) {
        return null;
      } else {
        throw new HttpException('Artist was not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }
}
