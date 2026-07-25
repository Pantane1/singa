import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Player } from './components/Player';
import { AudioProvider } from './context/AudioContext';
import { ThemeProvider } from './context/ThemeContext';
import { Home } from './pages/Home';
import { Library } from './pages/Library';
import { Favorites } from './pages/Favorites';
import { Playlists } from './pages/Playlists';
import { Settings } from './pages/Settings';

const AppShell = () => (
  <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.2),_transparent_50%),linear-gradient(135deg,_#020617,_#111827)] p-4 text-slate-100 lg:p-6">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
      <Sidebar />
      <div className="flex-1 space-y-6">
        <Header />
        <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="pb-40">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.main>
      </div>
    </div>
    <Player />
  </div>
);

const App = () => (
  <ThemeProvider>
    <AudioProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AudioProvider>
  </ThemeProvider>
);

export default App;
