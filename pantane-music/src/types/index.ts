export type ThemeMode = 'dark' | 'light';
export type RepeatMode = 'off' | 'all' | 'one';

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  filepath: string;
  sourceUrl: string;
  mimeType: string;
  duration: number;
  addedAt: string;
  playCount: number;
  lastPlayedAt: string | null;
  coverArt?: string | null;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  trackIds: string[];
  createdAt: string;
}

export interface AppPreferences {
  theme: ThemeMode;
  favorites: string[];
  playlists: Playlist[];
  recentTracks: string[];
}
