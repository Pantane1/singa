import { SearchBar } from './SearchBar';
import { FolderPicker } from './FolderPicker';
import { useAudio } from '../hooks/useAudio';

export const Header = () => {
  const { searchQuery, setSearchQuery } = useAudio();

  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-2xl shadow-black/20 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Pantane Music</p>
        <h1 className="text-xl font-semibold text-white">A cinematic local listening experience</h1>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FolderPicker />
      </div>
    </header>
  );
};
