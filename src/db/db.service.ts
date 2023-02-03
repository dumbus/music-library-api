import { Injectable } from '@nestjs/common';

import { Album } from 'src/album/interfaces/album.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { Favorites } from 'src/favorites/interfaces/favorites.interface';
import { Track } from 'src/track/interfaces/track.interfaces';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class DbService {
  public readonly albums: Album[] = [];
  public readonly artists: Artist[] = [];
  public readonly tracks: Track[] = [];
  public readonly users: User[] = [];
  public readonly favorites: Favorites = {
    albums: [],
    artists: [],
    tracks: [],
  };
}
