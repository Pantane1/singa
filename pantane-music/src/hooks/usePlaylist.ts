import { useAudio } from '../context/AudioContext';

export const usePlaylist = () => {
  const { playlists, createPlaylist, addTrackToPlaylist, removeTrackFromPlaylist, favorites } = useAudio();
  return { playlists, createPlaylist, addTrackToPlaylist, removeTrackFromPlaylist, favorites };
};
