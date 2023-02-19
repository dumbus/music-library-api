import {
  Injectable,
  Inject,
  forwardRef,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import { DbService } from '../../db/db.service';
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

  getAll() {
    return this.db.tracks;
  }

  getById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid track ID', HttpStatus.BAD_REQUEST);
    }

    const track = this.db.tracks.find((track) => track.id === id);

    if (!track) {
      throw new HttpException('Track was not found', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  getIndexById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid track ID', HttpStatus.BAD_REQUEST);
    }

    const trackIndex = this.db.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new HttpException('Track was not found', HttpStatus.NOT_FOUND);
    }

    return trackIndex;
  }

  create(createTrackDto: CreateTrackDto) {
    const trackId = uuidv4();
    const track = { id: trackId, ...createTrackDto };
    this.db.tracks.push(track);

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const { name, duration, artistId, albumId } = updateTrackDto;
    const track = this.getById(id);
    track.name = name;
    track.duration = duration;
    track.artistId = artistId;
    track.albumId = albumId;

    return track;
  }

  delete(id: string) {
    const trackIndex = this.getIndexById(id);
    this.db.tracks.splice(trackIndex, 1);

    this.favoritesService.removeTrack(id, true);

    return null;
  }

  removeArtist(artistId: string) {
    const oldTracks = this.getAll();

    const newTracks = oldTracks.map((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }

      return track;
    });

    this.db.tracks = newTracks;
  }

  removeAlbum(albumId: string) {
    const oldTracks = this.getAll();

    const newTracks = oldTracks.map((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }

      return track;
    });

    this.db.tracks = newTracks;
  }
}
