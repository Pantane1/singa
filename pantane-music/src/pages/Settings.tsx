import { useTheme } from '../context/ThemeContext';

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-4 pb-32">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
        <h2 className="text-xl font-semibold text-white">Settings</h2>
        <p className="mt-2 text-sm text-slate-400">Configure the experience to match your taste.</p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white">Appearance</h3>
            <p className="text-sm text-slate-400">Switch between dark and light modes.</p>
          </div>
          <button onClick={toggleTheme} className="rounded-full bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white">
            {theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          </button>
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/20">
        <h3 className="font-semibold text-white">Playback</h3>
        <p className="mt-2 text-sm text-slate-400">Shuffle, repeat, and quick play controls live in the bottom player for effortless control.</p>
      </div>
    </div>
  );
};
