# Exportify (English)

[![Build Status](https://api.travis-ci.com/watsonbox/exportify.svg?branch=master)](https://travis-ci.com/github/watsonbox/exportify)

<a href="https://exportify.app/"><img src="../../assets/screenshot.png"/></a>

Export your Spotify playlists to [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) by clicking on this link: [https://exportify.app/](https://exportify.app/).

---

### Read in other languages:
[English](README.en.md) | [Deutsch](README.de.md) | [Ελληνικά](README.el.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Svenska](README.sv.md) | [العربية](README.ar.md) | [日本語](README.ja.md) | [Türkçe](README.tr.md)

---

As many users have noted, there is no way to export/archive/backup playlists from the Spotify client for safekeeping. This application provides a simple interface for doing that using the [Spotify Web API](https://developer.spotify.com/documentation/web-api/).

**No data will be saved - the entire application runs in the browser.**

## Features

- ⚙️ Optional inclusion of album, artist and audio features data in export files
- 🎵 **Music download** (via YouTube) directly from exported playlists
- 🔍 Playlist search with [advanced search syntax](#advanced-search-syntax) and results export
- 🌓 Dark mode
- 🗺 Available in 12 languages
- 📱 Mobile friendly
- ℹ Quick reference help
- 🚀 [Advanced rate limiting handling](https://github.com/watsonbox/exportify/pull/75) for speedy exports
- 👩‍💻 Modern [React-based development stack](#stack) + test suite

## Usage

1. Fire up [the app](https://exportify.app/)
2. Click 'Get Started'
3. Grant Exportify read-only access to your playlists
4. Click the 'Export' button to export a playlist

### Music Download

Exportify now supports downloading music tracks directly from your playlists. This feature uses `yt-dlp` to find and download the best quality audio from YouTube, converts it to FLAC, and embeds the correct metadata and album art.

1. Ensure you have the backend server running (see [Development](#development))
2. Click the 'Download Music' button next to any playlist
3. Monitor progress in the bottom-right corner
4. Once complete, a zip file containing all tracks will be automatically downloaded

**Note:** This feature requires Python 3, `yt-dlp`, and `FFmpeg` to be installed on the host system.

## Quick Start (Windows)

If you are on Windows, you can use the provided batch files to set up and run the project quickly:

1. **`installers.bat`**: Run this first to install the main programs (**Python 3** and **Node.js**) if you don't have them yet.
2. **`libinstall.bat`**: Run this to install the necessary libraries (`yt-dlp`, `mutagen`, and `yarn` dependencies).
3. **`oneclickrun.bat`**: Run this to start both the frontend and backend server at once.

## Development

In the project directory, first run `yarn install` to set up dependencies.

For the music download feature, you will also need:
- [Python 3](https://www.python.org/downloads/)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp)
- [FFmpeg](https://ffmpeg.org/download.html) (Included in `lib/ffmpegWin64` for Windows)
- [Mutagen](https://mutagen.readthedocs.io/en/latest/)

Then you can run:

**`yarn dev`**: Runs both the React frontend and the Express backend server concurrently.
**`yarn start`**: Runs only the frontend app.
**`yarn server`**: Runs only the backend server (needed for music downloads).
