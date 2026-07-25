import { motion } from 'framer-motion';
import { useAudio } from '../hooks/useAudio';

export const FolderPicker = () => {
  const { scanLibrary, isScanning } = useAudio();

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={() => void scanLibrary()}
      className="rounded-full bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-950/30 transition hover:bg-fuchsia-500"
    >
      {isScanning ? 'Scanning…' : 'Open local folder'}
    </motion.button>
  );
};
