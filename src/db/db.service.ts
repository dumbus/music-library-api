import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AlbumEntity } from 'src/app/album/entities/album.entity';
import { ArtistEntity } from 'src/app/artist/entities/artist.entity';
import { TrackEntity } from 'src/app/track/entities/track.entity';
import { UserEntity } from 'src/app/user/entities/user.entity';

@Injectable()
export class DbService implements OnModuleInit {
  public albums: Repository<AlbumEntity>;
  public artists: Repository<ArtistEntity>;
  public tracks: Repository<TrackEntity>;
  public users: Repository<UserEntity>;

  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async onModuleInit() {
    this.albums = this.albumRepository;
    this.artists = this.artistRepository;
    this.tracks = this.trackRepository;
    this.users = this.userRepository;
  }

  // public albums: Album[] = [];
  // public artists: Artist[] = [];
  // public tracks: Track[] = [];
  // public users: User[] = [];
  // public favorites: Favorites = {
  //   albums: [],
  //   artists: [],
  //   tracks: [],
  // };
}
