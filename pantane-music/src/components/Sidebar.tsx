import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/library', label: 'Library' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/playlists', label: 'Playlists' },
  { to: '/settings', label: 'Settings' },
];

export const Sidebar = () => (
  <aside className="w-full rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-black/20 backdrop-blur lg:w-72">
    <div className="mb-6">
      <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-200">Pantane</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Music Player</h2>
      <p className="mt-2 text-sm text-slate-400">A curated local listening journey.</p>
    </div>
    <nav className="space-y-2">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-fuchsia-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);
