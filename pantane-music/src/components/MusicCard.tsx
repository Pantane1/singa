import { motion } from 'framer-motion';
import { useAudio } from '../hooks/useAudio';
import type { MusicTrack } from '../types';

interface MusicCardProps {
  track: MusicTrack;
}

export const MusicCard = ({ track }: MusicCardProps) => {
  const { currentTrack, isPlaying, playTrack, toggleFavorite, favorites } = useAudio();
  const isCurrent = currentTrack?.id === track.id;

  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20"
    >
      <button onClick={() => playTrack(track)} className="flex flex-1 items-center gap-3 text-left">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-600 to-violet-600 text-lg font-semibold text-white">
          {track.title.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-white">{track.title}</p>
          <p className="text-sm text-slate-400">{track.artist}</p>
        </div>
      </button>
      <div className="flex items-center gap-2">
        <button
          onClick={() => toggleFavorite(track.id)}
          className={`rounded-full px-3 py-2 text-sm ${favorites.includes(track.id) ? 'bg-fuchsia-600 text-white' : 'bg-slate-800 text-slate-300'}`}
        >
          {favorites.includes(track.id) ? '♥' : '♡'}
        </button>
        <button
          onClick={() => playTrack(track)}
          className="rounded-full bg-white/10 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/20"
        >
          {isCurrent && isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </motion.article>
  );
};
