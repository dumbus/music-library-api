import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AlbumEntity } from 'src/app/album/entities/album.entity';
import { ArtistEntity } from 'src/app/artist/entities/artist.entity';
import { TrackEntity } from 'src/app/track/entities/track.entity';
import { UserEntity } from 'src/app/user/entities/user.entity';
import { FavoriteAlbumEntity } from 'src/app/favorites/entities/favoriteAlbum.entity';
import { FavoriteArtistEntity } from 'src/app/favorites/entities/favoriteArtist.entity';
import { FavoriteTrackEntity } from 'src/app/favorites/entities/favoriteTrack.entity';

@Injectable()
export class DbService implements OnModuleInit {
  public albums: Repository<AlbumEntity>;
  public artists: Repository<ArtistEntity>;
  public tracks: Repository<TrackEntity>;
  public users: Repository<UserEntity>;
  public favoriteAlbums: Repository<FavoriteAlbumEntity>;
  public favoriteArtists: Repository<FavoriteArtistEntity>;
  public favoriteTracks: Repository<FavoriteTrackEntity>;

  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(FavoriteAlbumEntity)
    private favoriteAlbumRepository: Repository<FavoriteAlbumEntity>,
    @InjectRepository(FavoriteArtistEntity)
    private favoriteArtistRepository: Repository<FavoriteArtistEntity>,
    @InjectRepository(FavoriteTrackEntity)
    private favoriteTrackRepository: Repository<FavoriteTrackEntity>,
  ) {}

  async onModuleInit() {
    this.albums = this.albumRepository;
    this.artists = this.artistRepository;
    this.tracks = this.trackRepository;
    this.users = this.userRepository;
    this.favoriteAlbums = this.favoriteAlbumRepository;
    this.favoriteArtists = this.favoriteArtistRepository;
    this.favoriteTracks = this.favoriteTrackRepository;
  }
}
