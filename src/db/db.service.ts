import { Injectable } from '@nestjs/common';

import { Album } from 'src/app/album/interfaces/album.interface';
import { Artist } from 'src/app/artist/interfaces/artist.interface';
import { Favorites } from 'src/app/favorites/interfaces/favorites.interface';
import { Track } from 'src/app/track/interfaces/track.interfaces';
import { User } from 'src/app/user/interfaces/user.interface';

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
