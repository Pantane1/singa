import { useAudio } from '../context/AudioContext';

export const useLibrary = () => {
  const { tracks, isScanning, scanLibrary } = useAudio();
  return { tracks, isScanning, scanLibrary };
};
