import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadPreferencesFromDB, loadTracksFromDB, savePreferencesToDB, saveTracksToDB } from '../services/indexedDB';
import { pickMusicDirectory } from '../services/musicScanner';
import type { AppPreferences, MusicTrack, Playlist, RepeatMode } from '../types';

interface AudioContextValue {
  tracks: MusicTrack[];
  currentTrack: MusicTrack | null;
  isPlaying: boolean;
  playTrack: (track: MusicTrack) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  toggleFavorite: (trackId: string) => void;
  favorites: string[];
  playlists: Playlist[];
  createPlaylist: (name: string, description: string) => void;
  addTrackToPlaylist: (playlistId: string, trackId: string) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  scanLibrary: () => Promise<void>;
  isScanning: boolean;
  shuffle: boolean;
  toggleShuffle: () => void;
  repeat: RepeatMode;
  toggleRepeat: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentTracks: string[];
  isReady: boolean;
}

const AudioContext = createContext<AudioContextValue | undefined>(undefined);

const defaultPlaylists: Playlist[] = [
  {
    id: 'discover-weekly',
    name: 'Discover Weekly',
    description: 'A fresh mix for the week ahead.',
    trackIds: [],
    createdAt: new Date().toISOString(),
  },
];

const shuffleArray = <T,>(items: T[]) => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const nextIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
  }
  return copy;
};

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>(defaultPlaylists);
  const [recentTracks, setRecentTracks] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<RepeatMode>('off');
  const [searchQuery, setSearchQuery] = useState('');
  const [isReady, setIsReady] = useState(false);

  const currentTrack = useMemo(
    () => tracks.find((track) => track.id === currentTrackId) ?? null,
    [currentTrackId, tracks],
  );

  useEffect(() => {
    const boot = async () => {
      const [storedTracks, storedPreferences] = await Promise.all([loadTracksFromDB(), loadPreferencesFromDB()]);
      if (storedTracks.length) {
        setTracks(storedTracks);
        setCurrentTrackId(storedTracks[0]?.id ?? null);
      }
      if (storedPreferences) {
        setFavorites(storedPreferences.favorites ?? []);
        setPlaylists(storedPreferences.playlists?.length ? storedPreferences.playlists : defaultPlaylists);
        setRecentTracks(storedPreferences.recentTracks ?? []);
      }
      setIsReady(true);
    };

    void boot();
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    void saveTracksToDB(tracks);
  }, [isReady, tracks]);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    const preferences: AppPreferences = {
      theme: 'dark',
      favorites,
      playlists,
      recentTracks,
    };
    void savePreferencesToDB(preferences);
  }, [favorites, isReady, playlists, recentTracks]);

  const playTrack = (track: MusicTrack) => {
    setCurrentTrackId(track.id);
    setIsPlaying(true);
    setRecentTracks((prev) => [track.id, ...prev.filter((id) => id !== track.id)].slice(0, 8));
  };

  const togglePlay = () => {
    if (!currentTrack && tracks[0]) {
      playTrack(tracks[0]);
      return;
    }
    setIsPlaying((value) => !value);
  };

  const nextTrack = () => {
    if (!tracks.length) {
      return;
    }
    const trackIds = shuffle ? shuffleArray(tracks.map((track) => track.id)) : tracks.map((track) => track.id);
    const currentIndex = trackIds.indexOf(currentTrackId ?? trackIds[0]);
    const nextIndex = (currentIndex + 1) % trackIds.length;
    const nextTrackId = trackIds[nextIndex];
    const nextTrackMatch = tracks.find((track) => track.id === nextTrackId);
    if (nextTrackMatch) {
      playTrack(nextTrackMatch);
    }
  };

  const previousTrack = () => {
    if (!tracks.length) {
      return;
    }
    const trackIds = shuffle ? shuffleArray(tracks.map((track) => track.id)) : tracks.map((track) => track.id);
    const currentIndex = trackIds.indexOf(currentTrackId ?? trackIds[0]);
    const previousIndex = (currentIndex - 1 + trackIds.length) % trackIds.length;
    const previousTrackId = trackIds[previousIndex];
    const previousTrackMatch = tracks.find((track) => track.id === previousTrackId);
    if (previousTrackMatch) {
      playTrack(previousTrackMatch);
    }
  };

  const toggleFavorite = (trackId: string) => {
    setFavorites((prev) => (prev.includes(trackId) ? prev.filter((id) => id !== trackId) : [...prev, trackId]));
  };

  const createPlaylist = (name: string, description: string) => {
    const playlist: Playlist = {
      id: `playlist-${Date.now()}`,
      name,
      description,
      trackIds: [],
      createdAt: new Date().toISOString(),
    };
    setPlaylists((prev) => [playlist, ...prev]);
  };

  const addTrackToPlaylist = (playlistId: string, trackId: string) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId && !playlist.trackIds.includes(trackId)
          ? { ...playlist, trackIds: [...playlist.trackIds, trackId] }
          : playlist,
      ),
    );
  };

  const removeTrackFromPlaylist = (playlistId: string, trackId: string) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId ? { ...playlist, trackIds: playlist.trackIds.filter((id) => id !== trackId) } : playlist,
      ),
    );
  };

  const scanLibrary = async () => {
    setIsScanning(true);
    try {
      const discoveredTracks = await pickMusicDirectory();
      const dedupedTracks = discoveredTracks.filter((track, index, array) => array.findIndex((item) => item.id === track.id) === index);
      setTracks(dedupedTracks);
      if (dedupedTracks[0]) {
        setCurrentTrackId(dedupedTracks[0].id);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsScanning(false);
    }
  };

  const toggleShuffle = () => setShuffle((value) => !value);
  const toggleRepeat = () => {
    setRepeat((value) => {
      if (value === 'off') {
        return 'all';
      }
      if (value === 'all') {
        return 'one';
      }
      return 'off';
    });
  };

  const value = useMemo(
    () => ({
      tracks,
      currentTrack,
      isPlaying,
      playTrack,
      togglePlay,
      nextTrack,
      previousTrack,
      toggleFavorite,
      favorites,
      playlists,
      createPlaylist,
      addTrackToPlaylist,
      removeTrackFromPlaylist,
      scanLibrary,
      isScanning,
      shuffle,
      toggleShuffle,
      repeat,
      toggleRepeat,
      searchQuery,
      setSearchQuery,
      recentTracks,
      isReady,
    }),
    [tracks, currentTrack, isPlaying, favorites, playlists, isScanning, shuffle, repeat, searchQuery, recentTracks, isReady],
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used inside an AudioProvider');
  }
  return context;
};
