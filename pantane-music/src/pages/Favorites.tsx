import { MusicCard } from '../components/MusicCard';
import { useAudio } from '../hooks/useAudio';

export const Favorites = () => {
  const { tracks, favorites } = useAudio();
  const favoriteTracks = tracks.filter((track) => favorites.includes(track.id));

  return (
    <div className="space-y-4 pb-32">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
        <h2 className="text-xl font-semibold text-white">Favorites</h2>
        <p className="text-sm text-slate-400">The songs you keep close at hand.</p>
      </div>
      <div className="space-y-3">
        {favoriteTracks.length ? (
          favoriteTracks.map((track) => <MusicCard key={track.id} track={track} />)
        ) : (
          <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/70 p-8 text-center text-sm text-slate-400">
            Tap the heart on any track to save it here.
          </div>
        )}
      </div>
    </div>
  );
};
