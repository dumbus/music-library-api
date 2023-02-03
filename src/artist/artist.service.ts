import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import { DbService } from 'src/db/db.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private db: DbService) {}

  getAll() {
    return this.db.artists;
  }

  getById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid artist ID', HttpStatus.BAD_REQUEST);
    }

    const artist = this.db.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException('Artist was not found', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  getIndexById(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid artist ID', HttpStatus.BAD_REQUEST);
    }

    const artistIndex = this.db.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      throw new HttpException('Artist was not found', HttpStatus.NOT_FOUND);
    }

    return artistIndex;
  }

  create(createArtistDto: CreateArtistDto) {
    const artistId = uuidv4();
    const artist = { id: artistId, ...createArtistDto };
    this.db.artists.push(artist);

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const { name, grammy } = updateArtistDto;
    const artist = this.getById(id);
    artist.name = name;
    artist.grammy = grammy;

    return artist;
  }

  delete(id: string) {
    const artistIndex = this.getIndexById(id);
    this.db.artists.splice(artistIndex, 1);

    return null;
  }
}
