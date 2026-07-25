# Pantane Music

A polished local music player built with React, TypeScript, Tailwind CSS, Framer Motion, and the File System Access API. It lets you browse music from a local folder, view your library, build playlists, save favorites, search tracks, and control playback from a responsive Spotify-inspired interface.

## Features

- Local music scanning from a selected folder using the File System Access API
- Metadata extraction for title, artist, album, and duration using music-metadata-browser
- Library view with search and quick browsing
- Favorites and playlists
- Recently played section and quick picks on the home screen
- Shuffle, repeat, and a bottom music player with a visual equalizer
- IndexedDB persistence for your library and preferences
- Responsive layout for desktop and mobile

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- music-metadata-browser
- IndexedDB

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the app in your browser at http://localhost:3000/
4. Click "Open local folder" to select a directory containing music files

## Build

To create a production build:

```bash
npm run build
```

## Notes

- This app uses browser APIs that require a modern browser with support for the File System Access API.
- Some browsers may restrict folder access, so use an updated Chromium-based browser for the best experience.
