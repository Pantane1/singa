import { parseBlob } from 'music-metadata-browser';
import type { MusicTrack } from '../types';

const makeId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const buildTrackFromFile = async (file: File): Promise<MusicTrack> => {
  const metadata = await parseBlob(file);
  const common = metadata.common;
  const format = metadata.format;

  const coverArt = common.picture?.[0]
    ? URL.createObjectURL(new Blob([common.picture[0].data], { type: common.picture[0].format }))
    : null;

  return {
    id: makeId(),
    title: common.title || file.name.replace(/\.[^/.]+$/, ''),
    artist: common.artist || 'Unknown artist',
    album: common.album || 'Unknown album',
    filepath: file.name,
    sourceUrl: URL.createObjectURL(file),
    mimeType: file.type || 'audio/mpeg',
    duration: format.duration || 0,
    addedAt: new Date().toISOString(),
    playCount: 0,
    lastPlayedAt: null,
    coverArt,
  };
};
