import { MusicCard } from '../components/MusicCard';
import { useAudio } from '../hooks/useAudio';

export const Library = () => {
  const { tracks, searchQuery } = useAudio();
  const visibleTracks = tracks.filter((track) => {
    const query = searchQuery.toLowerCase();
    return [track.title, track.artist, track.album].some((value) => value.toLowerCase().includes(query));
  });

  return (
    <div className="space-y-4 pb-32">
      <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
        <div>
          <h2 className="text-xl font-semibold text-white">Library</h2>
          <p className="text-sm text-slate-400">Your local music, arranged in a clean, browsable view.</p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">{visibleTracks.length} songs</span>
      </div>
      <div className="space-y-3">
        {visibleTracks.length ? (
          visibleTracks.map((track) => <MusicCard key={track.id} track={track} />)
        ) : (
          <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/70 p-8 text-center text-sm text-slate-400">
            No matching tracks yet. Open a local folder to load your music.
          </div>
        )}
      </div>
    </div>
  );
};
