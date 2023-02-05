import { Album } from '../../album/interfaces/album.interface';
import { Artist } from '../../artist/interfaces/artist.interface';
import { Track } from '../../track/interfaces/track.interfaces';

export interface Favorites {
  albums: string[]; // favorite albums ids
  artists: string[]; // favorite artists ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse {
  albums: Album[];
  artists: Artist[];
  tracks: Track[];
}
