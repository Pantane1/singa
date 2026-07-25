import { motion } from 'framer-motion';
import { MusicCard } from '../components/MusicCard';
import { useAudio } from '../hooks/useAudio';

export const Home = () => {
  const { tracks, recentTracks, favorites, playTrack } = useAudio();

  const recent = tracks.filter((track) => recentTracks.includes(track.id)).slice(0, 3);
  const featured = tracks.slice(0, 4);

  return (
    <div className="space-y-6 pb-32">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-700 via-violet-700 to-slate-900 p-6 shadow-2xl shadow-fuchsia-950/40"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-200">Spotify-style flow</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Discover your local library like never before.</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-200">
          Open a folder, scan your library, and enjoy a polished listening experience with favorites, playlists, and instant search.
        </p>
      </motion.section>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Recently played</h3>
            <span className="text-sm text-slate-400">{recent.length} tracks</span>
          </div>
          {recent.length ? (
            <div className="space-y-3">
              {recent.map((track) => (
                <MusicCard key={track.id} track={track} />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">Your last listens will appear here automatically.</p>
          )}
        </section>

        <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
          <h3 className="text-lg font-semibold text-white">Quick picks</h3>
          <div className="space-y-3">
            {featured.length ? (
              featured.map((track) => (
                <button key={track.id} onClick={() => playTrack(track)} className="flex w-full items-center justify-between rounded-2xl bg-slate-800/70 px-4 py-3 text-left text-sm text-slate-200">
                  <span>{track.title}</span>
                  <span className="text-slate-400">{track.artist}</span>
                </button>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">Scan a folder to start building your library.</p>
            )}
          </div>
          <div className="rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10 p-4 text-sm text-fuchsia-100">
            <p className="font-medium">Favorites saved: {favorites.length}</p>
          </div>
        </section>
      </div>
    </div>
  );
};
