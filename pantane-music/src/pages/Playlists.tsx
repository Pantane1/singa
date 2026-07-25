import { useState } from 'react';
import { PlaylistModal } from '../components/PlaylistModal';
import { useAudio } from '../hooks/useAudio';

export const Playlists = () => {
  const { playlists, tracks, addTrackToPlaylist } = useAudio();
  const [isOpen, setIsOpen] = useState(false);
  const { createPlaylist } = useAudio();

  return (
    <div className="space-y-4 pb-32">
      <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
        <div>
          <h2 className="text-xl font-semibold text-white">Playlists</h2>
          <p className="text-sm text-slate-400">Curate a soundtrack for every mood.</p>
        </div>
        <button onClick={() => setIsOpen(true)} className="rounded-full bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white">
          New playlist
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {playlists.map((playlist) => {
          const playlistTracks = tracks.filter((track) => playlist.trackIds.includes(track.id));
          return (
            <div key={playlist.id} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{playlist.name}</h3>
                  <p className="text-sm text-slate-400">{playlist.description}</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">{playlistTracks.length} songs</span>
              </div>
              <div className="mt-4 space-y-2">
                {playlistTracks.length ? (
                  playlistTracks.slice(0, 4).map((track) => <div key={track.id} className="rounded-2xl bg-slate-800/70 px-3 py-2 text-sm text-slate-300">{track.title}</div>)
                ) : (
                  <p className="text-sm text-slate-400">Add a track from the library using the heart action.</p>
                )}
              </div>
              <button onClick={() => addTrackToPlaylist(playlist.id, tracks[0]?.id ?? '')} className="mt-4 rounded-full bg-white/10 px-3 py-2 text-sm text-slate-200">
                Add sample track
              </button>
            </div>
          );
        })}
      </div>
      <PlaylistModal isOpen={isOpen} onClose={() => setIsOpen(false)} onCreate={createPlaylist} />
    </div>
  );
};
