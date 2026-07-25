import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAudio } from '../hooks/useAudio';

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00';
  }
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const Player = () => {
  const { currentTrack, isPlaying, nextTrack, previousTrack, togglePlay, shuffle, toggleShuffle, repeat, toggleRepeat } = useAudio();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) {
      setProgress(0);
      setDuration(0);
      return;
    }

    if (currentTrack.sourceUrl) {
      audio.src = currentTrack.sourceUrl;
      audio.load();
      if (isPlaying) {
        void audio.play();
      }
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (isPlaying) {
      void audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
    setProgress(value);
  };

  const handleEnded = () => {
    if (repeat === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        void audioRef.current.play();
      }
      return;
    }
    nextTrack();
  };

  const badge = useMemo(() => {
    if (!currentTrack) {
      return 'Choose a track to begin listening';
    }
    return `${currentTrack.artist} • ${currentTrack.album}`;
  }, [currentTrack]);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/90 px-4 py-4 backdrop-blur"
    >
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-600 to-violet-600 text-lg font-semibold text-white">
            {currentTrack ? currentTrack.title.charAt(0).toUpperCase() : '♫'}
          </div>
          <div>
            <p className="font-medium text-white">{currentTrack?.title ?? 'No track selected'}</p>
            <p className="text-sm text-slate-400">{badge}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 lg:max-w-2xl">
          <div className="flex items-center justify-center gap-3">
            <button onClick={toggleShuffle} className={`rounded-full px-3 py-2 text-sm ${shuffle ? 'bg-fuchsia-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
              Shuffle
            </button>
            <button onClick={previousTrack} className="rounded-full bg-slate-800 px-3 py-2 text-sm text-slate-200">
              ⏮
            </button>
            <button onClick={togglePlay} className="rounded-full bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white">
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button onClick={nextTrack} className="rounded-full bg-slate-800 px-3 py-2 text-sm text-slate-200">
              ⏭
            </button>
            <button onClick={toggleRepeat} className={`rounded-full px-3 py-2 text-sm ${repeat !== 'off' ? 'bg-fuchsia-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
              {repeat === 'one' ? 'Repeat 1' : 'Repeat'}
            </button>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <span>{formatTime(progress)}</span>
            <input type="range" min="0" max={duration || 1} step="0.1" value={progress} onChange={handleSeek} className="h-1 flex-1 cursor-pointer" />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="text-sm text-slate-400">{currentTrack ? `${Math.round((currentTrack.duration || 0) / 60)} min` : 'Ready to play'}</div>
      </div>
    </motion.footer>
  );
};
