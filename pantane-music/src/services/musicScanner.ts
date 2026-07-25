import { buildTrackFromFile } from './metadata';
import type { MusicTrack } from '../types';

const supportedExtensions = ['.mp3', '.m4a', '.aac', '.wav', '.flac', '.ogg', '.mp4'];

const isMusicFile = (name: string) => supportedExtensions.some((ext) => name.toLowerCase().endsWith(ext));

const scanDirectory = async (
  handle: FileSystemDirectoryHandle,
  tracks: MusicTrack[],
  depth = 0,
): Promise<void> => {
  if (depth > 4) {
    return;
  }

  const iterator = (handle as unknown as { entries: () => AsyncIterable<[string, FileSystemHandle]> }).entries();

  for await (const [name, entry] of iterator) {
    if (entry.kind === 'file' && isMusicFile(name)) {
      const file = await (entry as FileSystemFileHandle).getFile();
      const track = await buildTrackFromFile(file);
      tracks.push(track);
    }

    if (entry.kind === 'directory') {
      await scanDirectory(entry as FileSystemDirectoryHandle, tracks, depth + 1);
    }
  }
};

export const pickMusicDirectory = async (): Promise<MusicTrack[]> => {
  if (typeof window === 'undefined' || !('showDirectoryPicker' in window)) {
    throw new Error('The File System Access API is not available in this browser.');
  }

  const picker = window.showDirectoryPicker as () => Promise<FileSystemDirectoryHandle>;
  const handle = await picker();
  const discoveredTracks: MusicTrack[] = [];
  await scanDirectory(handle, discoveredTracks);
  return discoveredTracks;
};
