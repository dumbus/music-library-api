import {
  Injectable,
  Inject,
  forwardRef,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import { TrackEntity } from './entities/track.entity';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,

    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  async getAll() {
    try {
      return await this.trackRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string) {
    try {
      if (!uuidValidate(id)) {
        throw new HttpException('Invalid track ID', HttpStatus.BAD_REQUEST);
      }

      const track = await this.trackRepository.findOne({ where: { id } });

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
      await this.trackRepository.save(track);

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

      await this.trackRepository.save(track);

      return track;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.getById(id);
      const deletionResult = await this.trackRepository.delete(id);

      if (deletionResult) {
        return null;
      } else {
        throw new HttpException('Artist was not found', HttpStatus.NOT_FOUND);
      }

      // this.favoritesService.removeTrack(id, true);
    } catch (error) {
      throw error;
    }
  }

  // removeArtist(artistId: string) {
  //   const oldTracks = this.getAll();

  //   const newTracks = oldTracks.map((track) => {
  //     if (track.artistId === artistId) {
  //       track.artistId = null;
  //     }

  //     return track;
  //   });

  //   this.db.tracks = newTracks;
  // }

  // removeAlbum(albumId: string) {
  //   const oldTracks = this.getAll();

  //   const newTracks = oldTracks.map((track) => {
  //     if (track.albumId === albumId) {
  //       track.albumId = null;
  //     }

  //     return track;
  //   });

  //   this.db.tracks = newTracks;
  // }
}
