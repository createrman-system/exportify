[![Build Status](https://api.travis-ci.com/watsonbox/exportify.svg?branch=master)](https://travis-ci.com/github/watsonbox/exportify)

<a href="https://exportify.app/"><img src="../../assets/screenshot.png"/></a>

Exportieren Sie Ihre Spotify-Playlists nach [CSV](https://de.wikipedia.org/wiki/CSV-Dateiformat), indem Sie auf diesen Link klicken: [https://exportify.app/](https://exportify.app/).

---

### In anderen Sprachen lesen:
[English](README.en.md) | [Deutsch](README.de.md) | [Ελληνικά](README.el.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Svenska](README.sv.md) | [العربية](README.ar.md) | [日本語](README.ja.md) | [Türkçe](README.tr.md)

---

Wie viele Nutzer bemerkt haben, gibt es keine Möglichkeit, Playlists aus dem Spotify-Client zur sicheren Aufbewahrung zu exportieren/archivieren/sichern. Diese Anwendung bietet eine einfache Schnittstelle dafür unter Verwendung der [Spotify Web API](https://developer.spotify.com/documentation/web-api/).

**Es werden keine Daten gespeichert - die gesamte Anwendung läuft im Browser.**

## Funktionen

- ⚙️ Optionale Einbeziehung von Album-, Künstler- und Audio-Feature-Daten
- 🎵 **Musik-Download** (über YouTube) direkt aus exportierten Playlists
- 🔍 Playlist-Suche mit [erweiterter Suchsyntax](#erweiterte-suchsyntax) und Ergebnisexport
- 🌓 Dunkelmodus
- 🗺 Verfügbar in 12 Sprachen
- 📱 Mobilfreundlich
- ℹ Schnelle Hilfe-Referenz
- 🚀 [Erweitertes Rate-Limiting-Handling](https://github.com/watsonbox/exportify/pull/75) für schnelle Exporte
- 👩‍💻 Moderner [React-basierter Development-Stack](#stack) + Test-Suite

## Verwendung

1. Starten Sie [die App](https://exportify.app/)
2. Klicken Sie auf 'Get Started'
3. Gewähren Sie Exportify Lesezugriff auf Ihre Playlists
4. Klicken Sie auf die Schaltfläche 'Export', um eine Playlist zu exportieren

### Musik-Download

Exportify unterstützt jetzt das Herunterladen von Musiktiteln direkt aus Ihren Playlists. Diese Funktion nutzt `yt-dlp`, um die beste Audioqualität auf YouTube zu finden, konvertiert sie in FLAC und fügt die korrekten Metadaten und das Album-Cover hinzu.

1. Stellen Sie sicher, dass der Backend-Server läuft (siehe [Entwicklung](#entwicklung))
2. Klicken Sie auf die Schaltfläche 'Download Music' neben einer Playlist
3. Verfolgen Sie den Fortschritt in der unteren rechten Ecke
4. Nach Abschluss wird automatisch eine Zip-Datei mit allen Titeln heruntergeladen

**Hinweis:** Diese Funktion erfordert Python 3, `yt-dlp` und `FFmpeg`.

## Schnellstart (Windows)

Wenn Sie Windows nutzen, können Sie die bereitgestellten Batch-Dateien verwenden:

1. **`installers.bat`**: Zuerst ausführen, um **Python 3** und **Node.js** zu installieren.
2. **`libinstall.bat`**: Ausführen, um die notwendigen Bibliotheken zu installieren.
3. **`oneclickrun.bat`**: Ausführen, um Frontend und Backend gleichzeitig zu starten.

## Entwicklung

Führen Sie im Projektverzeichnis zuerst `yarn install` aus.

Für die Musik-Download-Funktion benötigen Sie außerdem:
- [Python 3](https://www.python.org/downloads/)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp)
- [FFmpeg](https://ffmpeg.org/download.html) (Enthalten in `lib/ffmpegWin64` für Windows)
- [Mutagen](https://mutagen.readthedocs.io/en/latest/)

Dann können Sie ausführen:

**`yarn dev`**: Startet Frontend und Backend gleichzeitig.
**`yarn start`**: Startet nur die Frontend-App.
**`yarn server`**: Startet nur den Backend-Server (für Downloads benötigt).
