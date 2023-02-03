import { Injectable } from '@nestjs/common';

import { Album } from 'src/album/interfaces/album.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { Favorites } from 'src/favorites/interfaces/favorites.interface';
import { Track } from 'src/track/interfaces/track.interfaces';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class DbService {
  public albums: Album[] = [];
  public artists: Artist[] = [];
  public tracks: Track[] = [];
  public users: User[] = [];
  public favorites: Favorites = {
    albums: [],
    artists: [],
    tracks: [],
  };
}
