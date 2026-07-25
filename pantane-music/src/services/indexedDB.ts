import type { AppPreferences, MusicTrack } from '../types';

const DB_NAME = 'pantane-music-db';
const DB_VERSION = 1;

const openDatabase = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('library')) {
        db.createObjectStore('library', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('preferences')) {
        db.createObjectStore('preferences', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

const serializeTrack = (track: MusicTrack) => ({
  ...track,
  sourceUrl: '',
});

export const saveTracksToDB = async (tracks: MusicTrack[]) => {
  const db = await openDatabase();
  const tx = db.transaction('library', 'readwrite');
  const store = tx.objectStore('library');
  const payload = tracks.map(serializeTrack);

  for (const track of payload) {
    store.put(track);
  }

  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

export const loadTracksFromDB = async (): Promise<MusicTrack[]> => {
  const db = await openDatabase();
  const tx = db.transaction('library', 'readonly');
  const store = tx.objectStore('library');
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as MusicTrack[]);
    request.onerror = () => reject(request.error);
  });
};

export const savePreferencesToDB = async (preferences: AppPreferences) => {
  const db = await openDatabase();
  const tx = db.transaction('preferences', 'readwrite');
  const store = tx.objectStore('preferences');
  const payload = { id: 'app-state', ...preferences };
  store.put(payload);

  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

export const loadPreferencesFromDB = async (): Promise<AppPreferences | null> => {
  const db = await openDatabase();
  const tx = db.transaction('preferences', 'readonly');
  const store = tx.objectStore('preferences');
  const request = store.get('app-state');

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve((request.result as AppPreferences | undefined) ?? null);
    request.onerror = () => reject(request.error);
  });
};
